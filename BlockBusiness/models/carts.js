var mongoose = require('mongoose');
var cartschema= require('../schemas/carts');
var Cart = mongoose.model('cart',cartschema);

module.exports = Cart
