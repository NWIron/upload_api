const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

/* Setup Folder Path */
const folderPath = 'C:/Attachments';

/* POST Delete File */
router.post('/', function (req, res, next) {
    let keys = req.body.keys;
    let storagePath = folderPath;

    keys.forEach(element => {
        storagePath = path.join(storagePath, element);
    });

    /* Delete Selected File */
    fs.unlink(storagePath, (error) => {
        if (error) {

        } else {
            res.send(JSON.stringify(req.body));
        }
    });
});

module.exports = router;
