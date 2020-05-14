const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

/* Setup Folder Path */
const folderPath = 'C:/Attachments';

/* Get Json File List */
getJsonFile = (storagePath) => {
  let aJsonFiles = [];

  try {
    fs.accessSync(storagePath);

    let aFiles = fs.readdirSync(storagePath);

    aFiles.forEach((item, index) => {
      let fPath = path.join(storagePath, item);
      let stat = fs.statSync(fPath);

      if (stat.isFile() === true) {   //Check if file 
        aJsonFiles.push({
          FileName: item,             //File Name
          CreateDate: stat.ctime,     //File Create DateTime
          Size: stat.size             //File Size
        });
      }

    });

  } catch (e) {

  } finally {
    return aJsonFiles;
  }
}

/* GET File List. */
router.get('/', (req, res, next) => {
  const { fiori_app, plant, material_number, batch } = req.query;
  let storagePath = path.join(folderPath, fiori_app, plant, material_number, batch);
  res.send(getJsonFile(storagePath));
});

module.exports = router;