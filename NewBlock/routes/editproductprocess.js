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
    // console.log("--------------2. editinnnnnnnnnnnnnnnnngggggg------------------");
    // console.log("eidt Product=");
    // console.log("selleruid = "+selleruid);
    //
    // console.log("pid="+pid);
    // console.log("imgPath="+imgPath);
    // console.log("productName="+productName);
    // console.log("productPrice="+productPrice);
    // console.log("productInfo="+productInfo);



    // //调用数据库，写入4个商品参数，返回pid
    update_json = {$set: { 'productName':productName, 'productPrice':productPrice, 'productInfo':productInfo ,'imgPath':imgPath}};



    Product.update({'_id': pid},update_json,function(err,response){
        result = response;
        if(result == null || err)
        {
            return res.json({success:"didn't Update the EDIT product with pid"});
        }
        else
        {
            // console.log("--------- 1. 去更新cart---------json=pid----");
            console.log(update_json);
            console.log(pid);
            Cart.update({'pid': pid},update_json,{'multi':true},function(err2,response2){
                result2 = response2;
                // console.log("--------- 2. 去更新cart---------json=----");
                if(result2 == null || err2)
                {
                    // return res.json({success:"didn't Update the EDIT product  IN CART !!!! with pid"});
                    // console.log("--------- 3. 去更新cart---------cart 没有这个pid----");
                    res.send({
                        err: null,
                        msg:pid.toString()
                    });
                }else{
                    // console.log("--------- 4. 去更新cart 成功-------------");
                    res.send({
                        err: null,
                        msg:pid.toString()
                    });

                }
            });



            // res.send({
            //     err: null,
            //     msg:pid.toString()
            // });
        }
    });

});


module.exports = router;
