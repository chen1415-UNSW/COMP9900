var Product=require('../models/products');
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({extend:false}));
router.use(bodyParser.json());


router.get('/', function(req, res, next) {

    if(req.session.user == undefined)
    {
        res.redirect('/signup');
    }
    else
    {
        var selleruid = req.query.uid;
        console.log("MYproducts backend uid=");
        console.log(selleruid);

        Product.find({'selleruid': selleruid},function(err,result){
            pidList = result;
            console.log("backend checkout pidList=");
            //console.log(pidList);


            if(pidList == null)
            {
                return res.json({success:"didn't get products  need to show MYproducts with this uid"});
            }
            else
            {

                var pidList_json = {
                    result: pidList,
                    u_name: req.session.user.username,
                    uid:req.session.userid.uid,
                    title:"My Store"};

                res.render('myproducts',pidList_json);
            }
        });

    }

});

module.exports = router;
