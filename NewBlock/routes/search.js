var express = require('express');
var router = express.Router();
var Product=require('../models/products');
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({extend:false}));
router.use(bodyParser.json());


/* GET users listing. */
// router.get("/",function(req, res, next) {
//     res.render('searchresult');
//
// });

// router.post('/', function(req, res, next) {
router.get('/', function(req, res, next) {
    // res.send('respond with a resource');
    var searchInfo = req.query.searchInfo;//get
    // var searchInfo = req.body.searchInfo;
    console.log(searchInfo);
    // console.log(req.body);

    // Product.find({'productName': {$exists:searchInfo}},function(err,response){
    Product.find({'productName': searchInfo},function(err,response){
        resultList = response;
        console.log("backend resultList=");
        console.log(resultList);
        if(resultList == null)
        {
            return res.json({success:"didn't get products with searchInfo"});
        }
        else
        {
            console.log("resultList[0]=");

            var resultList_json = {result: resultList};

            res.render('searchresult', resultList_json);
            // res.send({
            //     err: null,
            //     msg: resultList
            // });


        }
    });

    // res.render('searchresult');
});

module.exports = router;
