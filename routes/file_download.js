const express = require('express');
const router = express.Router();
const path = require('path');

/* Setup Folder Path */
const folderPath = 'C:/SAP Attachments';

/* GET File Downloading */
router.get('/', (req, res, next) => {
  let keys = req.query.keys;
  let storagePath = folderPath;

  keys.forEach(element => {
    storagePath = path.join(storagePath, element);
  });

  res.download(storagePath);
});

module.exports = router;
