var mongoose = require('mongoose');


var CartSchema = new mongoose.Schema(
    {
        uid:String,
        pid:String,
        selleruid:String,
        productName:String,
        productInfo:String,
        productPrice:String,
        number:Number,
        imgPath: String,
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

CartSchema.pre("save",function (next) {
    if (this.isNew){
        this.meta.createAt = this.meta.updateAt=Date.now()
    }else{
        this.meta.updateAt=Date.now()
    }
    next()
})

CartSchema.statics={
    fetch:function (cb) {
        return this.find().sort('meta.updateAt')
            .exec(cb)
    },
    finduser:function (pid,cb) {
        return this.findOne({pid:pid}).exec(cb)
    }
}

module.exports=CartSchema
