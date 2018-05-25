var mongoose = require('mongoose');


var AddressSchema = new mongoose.Schema(
    {
        address: String,
        mask: Boolean
    }
)

module.exports = AddressSchema
