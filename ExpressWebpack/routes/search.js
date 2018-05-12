var express = require('express');
var router = express.Router();
var Product=require('../models/products');
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({extend:false}));
router.use(bodyParser.json());


router.get('/', function(req, res, next) {

    console.log("Search Result: ", req.session.user);

    if(req.session.user == undefined || req.session.user == "NULL")
    {
        var searchInfo = req.query.searchInfo;//get
        var min = req.query.min;
        var max = req.query.max;
        var regex = new RegExp(searchInfo,'i');

        Product.find({'productName': regex},function(err,response){
            resultList = response;
            if(resultList == null)
            {
                return res.json({success:"didn't get products with searchInfo"});
            }
            else
            {
                if (max!=undefined && min!=undefined) {
                    min = parseFloat(min);
                    max = parseFloat(max);
                    minmaxresultList = new Array();
                    for (var i = 0; i < resultList.length; i++) {
                        var eachprice = parseFloat(resultList[i].productPrice);

                        if (eachprice >= min && eachprice <= max) {
                            minmaxresultList.push(resultList[i]);
                        }
                    }

                    var resultList_json = {result:minmaxresultList, u_name: "NULL", searchInfo: searchInfo};

                    res.render('searchresult', resultList_json);
                }else{

                    var resultList_json = {result: resultList,
                        u_name: "NULL",
                        searchInfo :searchInfo};

                    res.render('searchresult', resultList_json);
                }


            }
        });


    }
    else
    {

        var searchInfo = req.query.searchInfo;//get
        var min = req.query.min;
        var max = req.query.max;

        var regex = new RegExp(searchInfo,'i');

        Product.find({'productName': regex},function(err,response){
            resultList = response;
            if(resultList == null)
            {
                return res.json({success:"didn't get products with searchInfo"});
            }
            else
            {
                if (max!=undefined && min!=undefined){
                    min = parseFloat(min);
                    max = parseFloat(max);
                    minmaxresultList = new Array();
                    for (var i = 0; i<resultList.length; i++ ){
                        var eachprice = parseFloat(resultList[i].productPrice);

                        if (eachprice>=min && eachprice<=max){
                            minmaxresultList.push(resultList[i]);
                        }
                    }

                    var resultList_json = {result: minmaxresultList,
                        u_name:req.session.user.username,
                        uid:req.session.userid.uid,
                        searchInfo :searchInfo};

                    res.render('searchresult', resultList_json);

                }else{

                    var resultList_json = {result: resultList,
                        u_name:req.session.user.username,
                        uid:req.session.userid.uid,
                        searchInfo :searchInfo};

                    res.render('searchresult', resultList_json);
                }


            }
        });

    }

});

module.exports = router;
