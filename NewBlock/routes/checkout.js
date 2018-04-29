
var Cart=require('../models/carts');
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
        var uid = req.query.uid;
        console.log("checkout backend uid=");
        console.log(uid);

        Cart.find({'uid': uid},function(err,result){
            pidList = result;
            console.log("backend checkout pidList=");
            console.log(pidList);


            if(pidList == null)
            {
                return res.json({success:"didn't get products  need to checkout with this uid"});
            }
            else
            {
                console.log("pidList len=");
                console.log(pidList.length);
                var pidList_json = {result: pidList,u_name: req.session.user.username,
                    uid:req.session.userid.uid};

                res.render('checkout',pidList_json);
            }
        });

    }

});


router.post("/delfromcart",function(req,res,next){
    var pid = req.body.pid;
    var uid = req.body.uid;
    console.log("/delfromcart pid=");
    console.log(pid);

    console.log("/delfromcart uid=");
    console.log(uid);

    Cart.remove({'pid': pid,'uid':uid}, function (err) {
        if (err) {
            res.send({
                err: "delete cart error from backend",
                msg: null
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

router.post("/itemtotalnum",function(req,res,next){
    var uid = req.body.uid;
    console.log("/itemtotalnum uid=");
    console.log(uid);
    //4.28 bug:已解决，cart 将pid和uid全部转成了大写，但是原表是小写
    Cart.find({'uid': uid},function(err,result){
        pidList = result;
        console.log("/itemtotalnum backend checkout pidList=");
        console.log(pidList);
        var itemtotalnum = 0;

        if(pidList == null)
        // if(pidList == null || pidList.length ==0)
        {
            return res.json({result:itemtotalnum});
        }
        else
        {
            console.log(" /itemtotalnum pidList len=");
            console.log(pidList.length);

            for (var i= 0; i<pidList.length; i++){
                var each = pidList[i];
                itemtotalnum = itemtotalnum + each.number;
            }

            console.log("/js backend itemtotalnum="+itemtotalnum)
            return res.json({result:itemtotalnum});
            // res.render('checkout',itemtotalnum_json);
        }
    });
});

router.post("/placeorder",function(req,res,next){
    console.log("in placeorder backend");

    var cartInfo_list = req.body.cartInfo_list;
    console.log("/placeorder cartInfo_list=");
    console.log(cartInfo_list);

    // 4.28 未完成，需要blockchain
    return res.json({msg:"testing Backend = cartInfO_List has sent to backend to /placeorder"})

});

module.exports = router;
