var express = require('express')
var router = express.Router()
var bodyParser = require('body-parser')
var Address = require('./addressInit')

router.use(bodyParser.urlencoded({extend:false}))
router.use(bodyParser.json())

router.get('/', function(req, res, next) {
    //Address.InitAllAddress()
    // (async () => {
    //     let addr = await Address.getAddress(true)
    //     if (addr === undefined) {
    //         console.log("No result matching")
    //     } else {
    //         console.log(addr.address)
    //         Address.updateAddress(addr.address, false)
    //     }
    // })()
   
    
    
    // console.log("------check set------")
    // addr = Address.getAddress(false)
    // console.log(addr)
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