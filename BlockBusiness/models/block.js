// var mongoose = require('mongoose');
// var cartschema= require('../schemas/carts');
// var Cart = mongoose.model('cart',cartschema);
//
//
// module.exports = Cart


var mongoose = require('mongoose');
var blockschema= require('../schemas/blocks');
var Block = mongoose.model('block',blockschema);


module.exports = Block
