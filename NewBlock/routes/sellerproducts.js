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
        var sellername = req.query.sellername;

        Product.find({'selleruid': selleruid},function(err,result){
            pidList = result;
            console.log("backend checkout pidList=");
            console.log(pidList);


            if(pidList == null)
            {
                return res.json({success:"didn't get products  need to show MYproducts with this uid"});
            }
            else
            {
                console.log("pidList len=");
                console.log(pidList.length);
                var pidList_json = {
                    result: pidList,
                    u_name: req.session.user.username,
                    uid:req.session.userid.uid,
                    title:sellername + "'s Store"
                };

                res.render('myproducts',pidList_json);
            }
        });

    }

});

module.exports = router;
