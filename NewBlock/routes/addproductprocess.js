var Product=require('../models/products');

var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({extend:false}));
router.use(bodyParser.json());


/* GET home page. */
// router.get('/', function(req, res, next) {
//     res.render('index', { title: 'Express' });
// });

router.post('/', function(req, res, next) {
    var productName = req.body.productName;
    var productInfo = req.body.productInfo;
    var productPrice = req.body.productPrice;
    var imgPath= req.body.imgPath;
    console.log("addPro: productName=");
    console.log(productName);
    // var pid = 10000;
    //调用数据库，写入4个商品参数，返回pid
    var productentity=new Product({productName:productName,productInfo:productInfo, productPrice:productPrice, imgPath:imgPath});
    productentity.save();
    console.log("pid=");
    console.log(productentity._id);
    var pid = productentity._id;
    // 返回pid给 处理addproduct的js code
    res.send({
        err: null,
        msg:pid.toString()
    });
});


module.exports = router;
