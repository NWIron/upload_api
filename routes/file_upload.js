const express = require('express');
const multer = require('multer');
const router = express.Router();

const uploadFolder = 'C:/Attachments';

/* Setup File Name & Location */
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadFolder);    // Storage Path
    },
    filename: (req, file, cb) => {
        // 将保存文件名设置为 字段名 + 时间戳，比如 logo-1478521468943
        var arr = file.originalname.split(".");
        var lastname = arr[arr.length - 1];
        cb(null, file.fieldname + "-" + Date.now() + "." + lastname);
    }
});

var upload = multer({ storage: storage });

/* Upload Single File. */
router.post('/', upload.single('file'), (req, res, next) => {
    var file = req.file;
    res.send({ ret_code: '0' });
});

module.exports = router;