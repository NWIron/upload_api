const express = require('express');
const fs = require('fs');
const join = require('path').join;
const router = express.Router();

/* Setup Folder Path */
const folderPath = 'C:/Attachments';

/* GET File List. */
router.get('/', function (req, res, next) {
  res.send(getJsonFile(folderPath));
});


getJsonFile = (path) => {
  let aJsonFiles = [];
  let aFiles = fs.readdirSync(path);

  aFiles.forEach((item, index) => {
    let fPath = join(path, item);
    let stat = fs.statSync(fPath);

    if (stat.isDirectory() === true) {  //Check if directory
      getJsonFile(fPath);
    }

    if (stat.isFile() === true) {   //Check if file 
      aJsonFiles.push({
        FileName: item,             //File Name
        CreateDate: stat.ctime,     //File Create DateTime
        Size: stat.size             //File Size
      });
    }

  });

  return aJsonFiles;
}

module.exports = router;