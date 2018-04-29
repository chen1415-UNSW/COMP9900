
var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/index', function(req, res, next) {
    if(req.session.user == undefined || req.session.user.u_name == "NULL")
    {
        res.render('index', {title:'Index Page', u_name:"NULL"});
    }
    else
    {
        console.log(req.session.user.username);
        console.log("req.session.userid.uid = ");
        console.log(req.session.userid.uid);
        res.render('index', {title:'Index Page',
                            u_name:req.session.user.username,
                            uid:req.session.userid.uid});
    }

});



router.get('/', function(req, res, next) {
    if(req.session.user == undefined || req.session.user.u_name == "NULL")
    {
        res.render('index', {title:'Index Page', u_name:"NULL"});
    }
    else
    {
        console.log(req.session.user.username);
        res.render('index', {title:'Index Page',
            u_name:req.session.user.username,
            uid:req.session.userid.uid});
    }
});

module.exports = router;
