const express = require('express');
const router = express.Router();
const multer = require('multer');
const fs = require('fs');
const path = require('path');

/* Setup Folder Path */
const folderPath = 'C:/Attachments';

/* Setup File Name & Location */
var storage = multer.diskStorage({
    destination: (req, file, cb) => {   //Setup Storage Location
        let keys = req.body.keys.split(',');
        let storagePath = folderPath;

        keys.forEach(element => {
            storagePath = path.join(storagePath, element);
        });

        validateDir(storagePath);       //Validate Storage Path
        cb(null, storagePath);
    },
    filename: (req, file, cb) => {      //Setup File Name
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