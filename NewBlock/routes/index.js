// module.exports = function (request, response, next) {
//     response.render('index');
//
// };



var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/index', function(req, res, next) {
    res.render('index');
});

module.exports = router;
