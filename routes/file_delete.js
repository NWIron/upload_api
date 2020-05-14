var express = require('express');
var router = express.Router();
const fs = require('fs');
const path = require('path');

/* Setup Folder Path */
const folderPath = 'C:/Attachments';

/* POST Delete File */
router.post('/', function (req, res, next) {
    const { file_name, fiori_app, plant, material_number, batch } = req.body;
    let storagePath = path.join(folderPath, fiori_app, plant, material_number, batch, file_name);
    fs.unlink(storagePath, (error) => {
        if (error) {

        } else {
            res.send(JSON.stringify(req.body));
        }
    })
});

module.exports = router;
