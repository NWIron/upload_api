const express = require('express');
const multer = require('multer');
const fs = require('fs');
const router = express.Router();
const path = require('path');

/* Setup Folder Path */
const folderPath = 'C:/Attachments';

/* Setup File Name & Location */
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const { fiori_app, plant, material_number, batch } = req.body;
        let storagePath = path.join(folderPath, fiori_app, plant, material_number, batch);
        validateDir(storagePath); // Storage Path
        cb(null, storagePath);
    },
    filename: (req, file, cb) => {
        //var arr = file.originalname.split(".");
        //var lastname = arr[arr.length - 1];
        //cb(null, file.fieldname + "-" + Date.now() + "." + lastname);
        cb(null, Date.now() + "_" + file.originalname);
    }
});

var upload = multer({ storage: storage });

/* Validate Directory */
validateDir = (dirname) => {
    if (fs.existsSync(dirname)) {
        return true;
    } else {
        if (validateDir(path.dirname(dirname))) {
            fs.mkdirSync(dirname);
            return true;
        }
    }
}

/* Upload Single File */
router.post('/', upload.single('file'), (req, res, next) => {
    res.send({ ret_code: '0' });
});

module.exports = router;