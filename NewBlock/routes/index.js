var Product=require('../models/products');
var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/index', function(req, res, next) {



    var regex = new RegExp("",'i');

    if(req.session.user == undefined || req.session.user.u_name == "NULL")
    {


        Product.find({'productName': regex},null, {limit:6},function(err,response){

            resultList = response;
            if(resultList == null)
            {
                return res.json({success:"didn't get products for index page"});
            }
            else
            {

                var resultList_json = {result: resultList, u_name:"NULL",title:'Index Page'};

                res.render('index', resultList_json);
            }
        });
    }
    else
    {
        var uid = req.session.userid.uid;
        Product.find({'selleruid': {$ne:uid}},null, {limit:6},function(err,response){

            resultList = response;
            if(resultList == null)
            {
                return res.json({success:"didn't get products for index page"});
            }
            else
            {

                var resultList_json = {
                    title:'Index Page',
                    result: resultList,
                    u_name:req.session.user.username,
                    uid:req.session.userid.uid
                };

                res.render('index', resultList_json);

            }
        });

    }

});



router.get('/', function(req, res, next) {
    var regex = new RegExp("",'i');

    if(req.session.user == undefined || req.session.user.u_name == "NULL")
    {


        Product.find({'productName': regex},null, {limit:6},function(err,response){

            resultList = response;
            if(resultList == null)
            {
                return res.json({success:"didn't get products for index page"});
            }
            else
            {

                var resultList_json = {result: resultList, u_name:"NULL",title:'Index Page'};

                res.render('index', resultList_json);
            }
        });
    }
    else
    {

        var uid = req.session.userid.uid;
        Product.find({'selleruid': {$ne:uid}},null, {limit:6},function(err,response){

            resultList = response;
            if(resultList == null)
            {
                return res.json({success:"didn't get products for index page"});
            }
            else
            {

                var resultList_json = {
                    title:'Index Page',
                    result: resultList,
                    u_name:req.session.user.username,
                    uid:req.session.userid.uid
                };

                res.render('index', resultList_json);

            }
        });

    }
});

module.exports = router;
