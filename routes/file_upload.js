const express = require('express');
const router = express.Router();
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const log_mysql = require('../logs/log_mysql.js');

/* Setup Folder Path */
const folderPath = 'C:/SAP Attachments';

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
        cb(null, file.originalname);
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
router.post('/', upload.array("file", 20), (req, res, next) => {
    /* Generate Upload Log */
    // log_mysql.file_upload_log(req, res, next);
    res.end("Upload Completed");
});

module.exports = router;