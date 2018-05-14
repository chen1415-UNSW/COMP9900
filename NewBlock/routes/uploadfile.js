var path = require("path");
var moment = require("moment");
var express = require("express");
var multer  = require('multer');
var router = express.Router();


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // cb(null, path.resolve('/../public/uploads'));
        cb(null, path.resolve('public/uploads'));
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({storage: storage});



router.get('/', function(req, res, next) {
    res.send('respond with a system resource');
});


router.post('/', upload.single('avatar'), function (req, res, next) {
    res.send({
        err: null,
        filePath: 'uploads/' + path.basename(req.file.path)
    });
});


module.exports = router;
