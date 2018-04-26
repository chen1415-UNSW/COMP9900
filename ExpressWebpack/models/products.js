var mongoose = require('mongoose');
var productschema= require('../schemas/products');
var Product = mongoose.model('product',productschema);


//sClient.findOne({'username':1234},function(err,res){console.log(res)})

module.exports = Product
