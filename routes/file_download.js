var express = require('express');
var router = express.Router();

/* Setup Folder Path */
const folderPath = 'C:/Attachments';

/* GET File Downloading */
router.get('/', function (req, res, next) {
  let filename = req.query.fileName;
  res.download(folderPath + '/' + filename);
});

module.exports = router;
