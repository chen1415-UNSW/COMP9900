var mongoose = require('mongoose');


var AddressSchema = new mongoose.Schema(
    {
        address: string,
        mask: boolean
    }
)

module.exports = AddressSchema
