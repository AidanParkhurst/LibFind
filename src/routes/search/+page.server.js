import fs from 'fs';
import path from 'path';
import fetch from 'node-fetch';
import pdfParse from 'pdf-parse';
import libgen from 'libgen';
/* TODO Add imports (Chatgpt, PDF-parse, Libgen) to process the PDF file */

/* Svelte Form Actions, because users upload PDFs through a form */
export const actions = {
    upload: async ({request}) => {
        const formData = await request.formData();
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
            /* TODO: Add code to process the file */
            const pdfData = fs.readFileSync(filename);
            let data = await pdfParse(pdfData);
            const text = data.text;

            const CHATGPT_API_KEY = OPENAI;
            const prompt = `Write down the names of all the textbooks required for this course on separate lines. Do not include any other information. ${text}`;

            const body = {
                model: "gpt-3.5-turbo-0125",
                prompt: prompt,
                max_tokens: 1024
              };

            const GPT_info = await fetch('https://api.openai.com/v1/engines/text-davinci-003/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${CHATGPT_API_KEY}`
            },
            body: JSON.stringify(body)
            });

            const chatGptResult = await chatGptResponse.json();
            const textbooks = chatGptResult.choices[0].text.split('\n');

            const results = [];
            for (let title of textbooks) {
                const options = {
                    mirror: 'http://gen.lib.rus.ec',
                    query: title,
                    count: 1
                };
                const searchResults = await libgen.search(options);
                if (searchResults.length > 0) {
                    const book = searchResults[0];
                    results.push({
                        title: book.title,
                        author: book.author,
                        downloadLink: `http://gen.lib.rus.ec/book/index.php?md5=${book.md5.toLowerCase()}`
                    });
                }
            }

            /* TODO: Return the appropriate data eventually*/
            return {
                status: 200,
                body: {
                    message: 'Textbooks found',
                    textbooks: results,
                },
            };

        } catch(err) {
            console.log(err);
        }

        return {
            status: 500,
            body: {
                message: 'File upload failed',
            },
        };
    },
};