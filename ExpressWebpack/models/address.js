var mongoose = require('mongoose');
var cartschema = require('../schemas/address');
var Address = mongoose.model('address', AddressSchema);

module.exports = Address
