const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        let ext = path.extname(file.originalname)
        cb(null , Date.now() + ext)
    }
})

const upload = multer ({
    storage: storage,
    fileFiler: function(req, file, cb) {
        if(
            file.minetype == "image/png" ||
            file.minetype == "image/jpg" ||
            file.mimetype === 'application/octet-stream' ||
            file.mimetype === 'text/plain' ||
            file.mimetype === 'application/vnd.ms-excel' ||
            file.mimetype === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
            file.mimetype === 'application/msword' ||
            file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
            file.mimetype === 'application/zip'
        ) {
            cb(null, true)
        } else { 
            console.log('Not supported!')
            cb(null, false)
        }
    },
    limits: {
        fileSize: 1024 * 1024 * 2
    }
})


module.exports = upload;