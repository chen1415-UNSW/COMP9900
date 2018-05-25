
var mongoose = require('mongoose');
var clientchema= require('../schemas/clients')
var Client = mongoose.model('client',clientchema)

module.exports=Client

