var Product=require('../models/products');
var Cart=require('../models/carts');

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
    var pid = req.body.pid;
    var selleruid = req.body.selleruid;
    var productStock = parseInt(req.body.productStock);


    update_json = {$set: { 'productName':productName, 'productPrice':productPrice, 'productInfo':productInfo,'productStock':productStock,'imgPath':imgPath}};



    Product.update({'_id': pid},update_json,function(err,response){
        result = response;
        if(result == null || err)
        {
            return res.json({success:"didn't Update the EDIT product with pid"});
        }
        else
        {
            Cart.update({'pid': pid},update_json,{'multi':true},function(err2,response2){
                result2 = response2;
                if(result2 == null || err2)
                {
                    res.send({
                        err: null,
                        msg:pid.toString()
                    });
                }else{
                    res.send({
                        err: null,
                        msg:pid.toString()
                    });

                }
            });

        }
    });

});


module.exports = router;
