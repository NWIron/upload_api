const express = require('express');
const fs = require('fs');
const router = express.Router();

const uploadFolder = 'C:/Attachments';

/* GET File List. */
router.get('/', function (req, res, next) {
  fs.readdir(uploadFolder, (err, files) => {
    res.send(files);
  })
});

module.exports = router;