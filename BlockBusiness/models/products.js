var mongoose = require('mongoose');
var productschema= require('../schemas/products');
var Product = mongoose.model('product',productschema);

module.exports = Product;
