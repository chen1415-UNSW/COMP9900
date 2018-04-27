var mongoose = require('mongoose');
var clientshema= require('../schemas/clients');

var Client = mongoose.model('client',clientshema);


//sClient.findOne({'username':1234},function(err,res){console.log(res)})

module.exports=Client;

// var mongoose = require('mongoose');
// var Schema = mongoose.Schema;
//
// var userSchema = new Schema({
//
// });
