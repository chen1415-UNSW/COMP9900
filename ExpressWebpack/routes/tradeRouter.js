var express = require('express')
var router = express.Router()
var bodyParser = require('body-parser')
router.use(bodyParser.urlencoded({extend:false}))
router.use(bodyParser.json())

router.get('/', function(req, res, next) {
    res.render('trade')
})

router.post('/', function(req, res, next){
   
    var content = JSON.parse(req.body.JSON)
    for (var i in content) {
        console.log("Data entry " + i)
        console.log(content[i])
    }
    res.render('trade')

})

module.exports = router