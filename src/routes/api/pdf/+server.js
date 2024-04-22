import multer from 'multer';
import fs from 'fs';
/* TODO: More imports for APIS we call to process the PDF file */
/* TODO: Maybe imports for environment variables in .env file*/

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + '.pdf')
  }
})

const upload = multer({ storage: storage })

export async function post(req, res) {
    upload.single('pdf')(req, res, err => {
        if (err) {
            res.end(JSON.stringify({ ok: false, message: 'Upload failed' }));
        } else {
            // req.file is the 'pdf' file
            fs.readFile(req.file.path, (err, data) => {
                if (err) res.end(JSON.stringify({ ok: false, message: 'File processing failed' }));
                else {
                    // TODO: Process the PDF data here//
                    
                    res.end(JSON.stringify({ ok: true, message: 'PDF processed successfully' }));
                }
            });
        }
    });
    
    // TODO: Finally, respond to the frontend
}