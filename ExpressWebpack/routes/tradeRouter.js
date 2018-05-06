var express = require('express')
var router = express.Router()
var bodyParser = require('body-parser')
router.use(bodyParser.urlencoded({extend:false}))
router.use(bodyParser.json())

router.get('/', function(req, res, next) {
    res.render('trade')
})

router.post('/', function(req, res, next){
    console.log(req.body)
    var content = req.body.JSON
    console.log(content)
    res.render('trade')
    

})

module.exports = router