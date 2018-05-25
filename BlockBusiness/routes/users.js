var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    if(req.session.user){
        var user=req.session.user;
        var name=user.name;
        res.send('Hi, '+name);
    }else{
        res.send('Not logged in!');
    }
  // res.send('respond with a resource');
});

module.exports = router;
