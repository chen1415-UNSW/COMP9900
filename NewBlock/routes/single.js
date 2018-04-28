var Product=require('../models/products');
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({extend:false}));
router.use(bodyParser.json());


router.get('/',function(req, res, next) {
    sample_json = {
        productName:"show sample 1",
        productInfo:"this is a sample info The Cutting Edge Of Comfort And Style Since 1987 this is a sample info The Cutting Edge Of Comfort And Style Since 1987",
        productPrice:"110",
        imgPath: "/images/grid6.jpg"
    };
    // res.render('single');
    res.render('single',sample_json);


});

router.get('/showproduct', function(req, res, next) {

    console.log("Show Product user: ", req.session.user);

    // console.log("Show Product uid: ", req.session.user.uid);

    if(req.session.user == undefined)
    {
        res.redirect('/signup');
    }
    else
    {
        var pid = req.query.pid;
        console.log("pid=");
        console.log(pid);

        var logstr = JSON.stringify({url:req.path});
        console.log(logstr);

        // 查数据库：未完继续
        //数据库里边找这条数据，render 这个记录
        var productName = "";
        var productInfo = "";
        var productPrice = "";
        var imgPath = "";

        Product.findOne({'_id': pid},function(err,response){
            result = response;
            if(result == null)
            {
                return res.json({success:"didn't find the product with pid"});
            }
            else
            {
                pid = result._id;
                productName = result.productName;
                productInfo = result.productInfo;
                productPrice = result.productPrice;
                imgPath = result.imgPath;

                console.log("db中找到了pid对应的 product=");
                console.log(productName);
                console.log(productInfo);
                console.log(productPrice );

                var product_json = {
                    pid:pid,
                    productName:productName,
                    productInfo:productInfo,
                    productPrice:productPrice,
                    imgPath: imgPath,
                    u_name: req.session.user.username

                };
                res.render('single', product_json);
            }
        });

    }


    // var pid = req.query.pid;
    // console.log("pid=");
    // console.log(pid);
    //
    // var logstr = JSON.stringify({url:req.path});
    // console.log(logstr);
    //
    // // 查数据库：未完继续
    // //数据库里边找这条数据，render 这个记录
    // var productName = "";
    // var productInfo = "";
    // var productPrice = "";
    // var imgPath = "";
    //
    // Product.findOne({'_id': pid},function(err,response){
    //     result = response;
    //     if(result == null)
    //     {
    //         return res.json({success:"didn't find the product with pid"});
    //     }
    //     else
    //     {
    //         pid = result._id;
    //         productName = result.productName;
    //         productInfo = result.productInfo;
    //         productPrice = result.productPrice;
    //         imgPath = result.imgPath;
    //
    //         console.log("db中找到了pid对应的 product=");
    //         console.log(productName);
    //         console.log(productInfo);
    //         console.log(productPrice );
    //
    //         var product_json = {
    //             pid:pid,
    //             productName:productName,
    //             productInfo:productInfo,
    //             productPrice:productPrice,
    //             imgPath: imgPath
    //
    //         };
    //         res.render('single', product_json);
    //     }
    // });
});

router.post('/delete', function(req, res, next) {
    var pid = req.body.delpid;
    // var pid = req.query.pid;
    console.log("single backend pid=");
    console.log(pid);
    Product.remove({'_id': pid}, function (err) {
        if (err) {
            res.send({
                err: "delete error from backend",
                msg: "false"
            });
            console.error(err);
        } else {
            res.send({
                err: null,
                msg: "true"
            });
        }
    });
});



module.exports = router;
