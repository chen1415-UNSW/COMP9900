var Product=require('../models/products');

var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({extend:false}));
router.use(bodyParser.json());




router.post('/', function(req, res, next) {
    var productName = req.body.productName;
    var productInfo = req.body.productInfo;
    var productPrice = req.body.productPrice;
    var imgPath= req.body.imgPath;
    var productStock = req.body.productStock;

    var selleruid = req.session.userid.uid;
    var sellername = req.session.user.username;

    //调用数据库，写入4个商品参数，返回pid
    var productentity=new Product({selleruid:selleruid,sellername:sellername,productName:productName,productInfo:productInfo, productPrice:productPrice, productStock:productStock,imgPath:imgPath});
    productentity.save();
    // console.log("pid=");
    // console.log(productentity._id);
    var pid = productentity._id;
    res.send({
        err: null,
        msg:pid.toString()
    });
});


module.exports = router;
