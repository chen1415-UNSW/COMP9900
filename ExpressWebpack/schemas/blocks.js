var mongoose = require('mongoose');


var BlockSchema = new mongoose.Schema(
    {
        blockhash:String,
        uid:String,
        pid:String,
        selleruid:String,

        buyerHash: String,
        sellerHash: String,

        productName:String,
        productPrice:String,
        number:Number,
        imgPath: String,
        blockIndex: Number,
        status: Boolean,

        meta:{
            createAt:{
                type:Date,
                default:Date.now()
            },
            updateAt:{
                type:Date,
                default:Date.now()
            }
        }
    }
)

BlockSchema.pre("save",function (next) {
    if (this.isNew){
        this.meta.createAt = this.meta.updateAt=Date.now()
    }else{
        this.meta.updateAt=Date.now()
    }
    next()
})

BlockSchema.statics={
    fetch:function (cb) {
        return this.find().sort('meta.updateAt')
            .exec(cb)
    },
    finduser:function (pid,cb) {
        return this.findOne({pid:pid}).exec(cb)
    }
}

module.exports=BlockSchema
