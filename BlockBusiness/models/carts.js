var mongoose = require('mongoose');
var cartschema= require('../schemas/carts');
var Cart = mongoose.model('cart',cartschema);


//sClient.findOne({'username':1234},function(err,res){console.log(res)})

module.exports = Cart
