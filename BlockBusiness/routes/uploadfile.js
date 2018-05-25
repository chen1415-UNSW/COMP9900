var path = require("path");
var moment = require("moment");
var express = require("express");
var multer  = require('multer');
var router = express.Router();
var imageCloud = require('../image');


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

    var imgPath = '/uploads/' + path.basename(req.file.path);
    console.log("-------------- 5.8 调试照片 cloud-----------")
    console.log("1. imgPath = "+ imgPath);

    imageCloud.uploadimage(imgPath, function(url) {
        console.log("3");


        res.send({
            err: null,
            filePath: url
        });

    });

});


module.exports = router;
