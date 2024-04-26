import fs from 'fs';
import path from 'path';
import fetch from 'node-fetch';
import parse from '@bakedpotatolord/pdf-parse';
import libgen from 'libgen';
import { CHATGPT_KEY } from '$env/static/private';

import db from '$lib/db/mongo';
import { redirect } from '@sveltejs/kit';

export async function load({ cookies }) {
    /* Fetch the user's textbooks from the database */
    let sessionToken = cookies.get('authjs.session-token');
    let userSession = await db.collection('sessions').findOne({sessionToken: sessionToken});
    let userId = userSession.userId;
    let user = await db.collection('users').findOne({ _id: userId });
    let textbooks = user.textbooks;

    console.log("Textbooks: ", textbooks);
	return {
        textbooks: textbooks
	};
}

/* Svelte Form Actions, because users upload PDFs through a form */
export const actions = {
    default: async ({request, cookies}) => {
        const formData = await request.formData();

        /* Get the user ID from our session database */
        let sessionToken = cookies.get('authjs.session-token');
        let userSession = await db.collection('sessions').findOne({sessionToken: sessionToken});
        let userId = userSession.userId

        let results = [];
        try {
            /* Right now we save files directly to our server,
                a more scalable move would be to save to a database */
            const file = formData.get('file');
            let filename = path.join(process.cwd(), 'uploads', file.name);
            let uploadData = await file.arrayBuffer();
            fs.writeFileSync(
                filename,
                new Uint8Array(uploadData)
            );
            /* At this point, the file is saved to the server */

            let dataBuffer = fs.readFileSync(filename);
            const data = await parse(dataBuffer);
            const text = data.text;

            const prompt = 
                `Write down the titles of all the textbooks required for this course in separate lines.
                Do not include any other information. Do not bullet the list. ${text}`;

            const body = {
                model: "gpt-3.5-turbo",
                messages: [
                    {
                        role: "system",
                        content: "You are an that finds textbooks from provided syllabuses."
                    },
                    {
                        role: "user",
                        content: prompt
                    }
                ],
                max_tokens: 3200
            };
            
            const GPT_info = await fetch('https://api.openai.com/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${CHATGPT_KEY}`
                },
                body: JSON.stringify(body)
            });
            
            const chatGptResult = await GPT_info.json();
            let textbooks = chatGptResult.choices[0].message.content.split('\n');
            
            const url = await libgen.mirror();

            for (let title of textbooks) {
                const options = {
                    mirror: url,
                    query: title,
                    count: 1
                };
                try {
                    const searchResults = await libgen.search(options);
                    if (searchResults?.length > 0) {
                        const book = searchResults[0];
                        results.push({
                            title: book.title,
                            author: book.author,
                            downloadLink: `http://libgen.is/book/index.php?md5=${book.md5.toLowerCase()}`
                        });
                    }
                } catch (e) {
                    return {
                        success: false,
                        error: true,
                    }
                }
            }
            
            console.log("Results: ");
            //* add the results to the users (possibly existing) "textbooks" entry in the database"
            if (results.length > 0)
                await db.collection('users').updateOne(
                    { _id: userId },
                    { $addToSet: { textbooks: { $each: results } } }
                );
            else
                return {
                    success: false,
                    error: true,
                };
        } catch(err) {
            console.error(err);
            return {
                success: false,
                error: true,
            };
        }

        return {
            success: true
        };
    },
};