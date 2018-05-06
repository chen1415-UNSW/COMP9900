
var mongoose = require('mongoose');
var clientchema= require('../schemas/clients')

var Client = mongoose.model('client',clientchema)


//sClient.findOne({'username':1234},function(err,res){console.log(res)})

module.exports=Client

