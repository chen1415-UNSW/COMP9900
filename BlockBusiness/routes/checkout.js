var Cart=require('../models/carts');
var Block=require('../models/block');
var Product =require('../models/products');
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
                return res.json({success:"didn't get products, checkout with this uid"});
            }
            else
            {

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
    var removeNum = parseInt(req.body.removeNum);

    // console.log("/delfromcart pid=");
    // console.log(pid);
    //
    // console.log("/delfromcart uid=");
    // console.log(uid);

    Cart.remove({'pid': pid,'uid':uid}, function (err) {
        if (err) {
            res.send({
                err: "delete cart error from backend",
                msg: null
            });
            console.error(err);
        } else {

            // delete from cart 成功，向product写回number
            Product.findOne({'_id': pid},function(err,response){
                result = response;
                if(result ==null){
                    res.send({
                        err: "delete cart+ add number back error fail",
                    });
                }else{
                    productStockNum = parseInt(result.productStock);
                    console.log("productStockNum="+productStockNum);
                    Product.update({'_id': pid}, {productStock: productStockNum+removeNum},function(err,result){
                        result = response;
                        if(result ==null){
                            res.send({
                                err: "delete cart+ add number back error fail",
                            });
                        } else{
                            console.log('remove cart+ Product stock add 成功：');

                            // res.send({
                            //     // 返回cartid给 处理addto cart的js code
                            //     err: null,
                            //     msg:"remove cart + addback numbers successfully"
                            // });
                            res.send({
                                err: null,
                                msg: "true"
                            });
                        }
                    });


                }

            });






            // res.send({
            //     err: null,
            //     msg: "true"
            // });
        }
    });
});

router.post("/itemtotalnum",function(req,res,next){
    var uid = req.body.uid;
    // console.log("/itemtotalnum uid=");
    // console.log(uid);
    Cart.find({'uid': uid},function(err,result){
        pidList = result;
        // console.log("/itemtotalnum backend checkout pidList=");
        // console.log(pidList);
        var itemtotalnum = 0;

        if(pidList == null)
        // if(pidList == null || pidList.length ==0)
        {
            return res.json({result:itemtotalnum});
        }
        else
        {
            // console.log(" /itemtotalnum pidList len=");
            // console.log(pidList.length);

            for (var i= 0; i<pidList.length; i++){
                var each = pidList[i];
                itemtotalnum = itemtotalnum + each.number;
            }

            // console.log("/js backend itemtotalnum="+itemtotalnum)
            return res.json({result:itemtotalnum});
            // res.render('checkout',itemtotalnum_json);
        }
    });
});

router.post("/placeorder", function(req,res,next){
    // 5.8 Blockchain返回数据后: 添加block schema + 删除cart
    console.log("--------------1. /placeorder 获取blockId list-------------------");
    var status = req.body.status;
    var cartInfo_list = req.body.cartInfo_list;
    var uid = req.body.uid;
    
    console.log("status=",status);
    console.log("uid=",uid);

    if (status ==1){
        console.log("status = 1");
        // 1. loop 写入交易记录
        for (var i=0; i<cartInfo_list.length;i++){
            block_json = {
                // 5.14 正式的Hash
                blockhash:cartInfo_list[i].hash,
                uid:cartInfo_list[i].uid,
                pid:cartInfo_list[i].pid,
                selleruid:cartInfo_list[i].selleruid,

                buyerHash:cartInfo_list[i].buyerHash.toString(),
                sellerHash:cartInfo_list[i].sellerHash.toString(),

                buyerName: cartInfo_list[i].buyerName,
                sellerName: cartInfo_list[i].sellerName,

                productName:cartInfo_list[i].productName,
                productPrice:cartInfo_list[i].productPrice,
                number:cartInfo_list[i].number,
                imgPath: cartInfo_list[i].imgPath,
                blockIndex: cartInfo_list[i].blockIndex,
                status: false,
                
            };
            var blockentity = new Block(block_json);
            blockentity.save();
            var block__id =blockentity._id;
            console.log("each block schema block__id=",block__id);

        }
        //2. 删除这个用户的cart
        Cart.remove({'uid':uid}, function (err) {
            if (err) {
                res.send({
                    err: "error: /placeorder delete cart error from backend",
                    msg: null
                });
                console.error(err);
            } else {
                console.log("/placeorder 1. 交易成功 2. 写入block schema，3. delete cart成功");
                res.send({
                    err: null,
                    msg: "placeorder success"
                });
            }
        });

    }else if (status ==0){
        console.log("/placeorder Fail in blockChain Backend => status = 0");
        return res.json({err:"Not enough balance : Fail in blockChain Backend => status = 0"});

    }

});

router.post("/confirmorder", function(req, res, next){
    
    console.log("--------------confirm the order------------------")
    var id = req.body.id
    Block.findOneAndUpdate({'_id':id}, {status:true}, function(err, result) {
        if (err) {
            res.send({
                err: err,
                msg: null
            })} else {
                console.log("Update block status successfully")
                res.send({
                    err: null,
                    msg: "Confirmed with smart contract successfully!"
                })
            }
        })
})

router.post("/delivery", function(req, res, next){
    
    console.log("--------------Make delivery-----------------")
    var id = req.body.id
    var note = req.body.note
    Block.findOneAndUpdate({'_id':id}, {delivery:note}, function(err, result) {
        if (err) {
            res.send({
                err: err,
                msg: null
            })} else {
                console.log("Record delievery successfully")
                res.send({
                    err: null,
                    msg: "Your delivery is recorded."
                })
            }
        })
})

router.post("/comment", function(req, res, next){
    console.log("-------Save Comment--------")
    var comment = req.body.comment
    console.log(comment)

})

module.exports = router;
