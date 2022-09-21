const multer = require('multer');
const express = require("express");
const router = express.Router();
const { validateApiKey} = require('../../middleware/index');

const upload = multer({
    storage: multer.memoryStorage()
})
const firebase = require('../../services/storageService/firebaseStorageService')

//upload any files in cloud
let routes = (app) => {

    app.post('/firebase/upload',
        validateApiKey,
        upload.single('file'),
        (req, res) => {
            if (!req.file) {
                res.status(400).send("Error: No files found")
            } else {
                const blob = firebase.bucket.file(req.file.originalname)

                const blobWriter = blob.createWriteStream({
                    metadata: {
                        contentType: req.file.mimetype
                    }
                })

                blobWriter.on('error', (err) => {
                    console.log(err)
                })

                blobWriter.on('finish', () => {
                    const medialLink = blob.metadata.mediaLink
                    const type = blob.metadata.contentType
                    res.status(200).send({ msg: "File uploaded.", medialLink, type })
                })

                blobWriter.end(req.file.buffer)
            }
        })

    app.use(router);
};
module.exports = routes;