const express = require('express');
const router = express.Router();
const path = require('path');

/* Setup Folder Path */
const folderPath = 'C:/Attachments';

/* GET File Downloading */
router.get('/', (req, res, next) => {
  const { file_name, fiori_app, plant, material_number, batch } = req.query;
  let storagePath = path.join(folderPath, fiori_app, plant, material_number, batch, file_name);
  res.download(storagePath);
});

module.exports = router;
