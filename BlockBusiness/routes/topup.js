var Cart = require('../models/carts');
var Block = require('../models/block');
var Product =require('../models/products');
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({extend:false}));
router.use(bodyParser.json());

router.get('/', function(req, res, next) {

    if(req.session.user == undefined || req.session.user.u_name == "NULL")
    {
        res.redirect('/signup')
    }
    else
    {   
        var u_name = req.session.user.username
        var u_hash = req.session.user.userhash
       
        res.render('topup',{
            u_name:u_name,
            uid:req.session.userid.uid,
            u_hash:u_hash
        })
        
    }

});
        

module.exports = router;
