import fs from 'fs';
import path from 'path';
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


            /* TODO: Return the appropriate data eventually*/
            return {
                status: 200,
                body: {
                    message: 'File uploaded successfully',
                    filename: file.name,
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