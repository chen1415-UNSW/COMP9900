var mongoose = require('mongoose');
//var db = mongoose.createConnection('mongodb://127.0.0.1:27017/test');


var ClientSchema = new mongoose.Schema(
    {
        userID:Number,
        username:String,
        //address:String,
        password:String,
        email:String,
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

ClientSchema.pre("save",function (next) {
    if (this.isNew){
        this.meta.createAt = this.meta.updateAt=Date.now()
    }else{
        this.meta.updateAt=Date.now()
    }
    next()
})

ClientSchema.statics={
    fetch:function (cb) {
        return this.find().sort('meta.updateAt')
            .exec(cb)
    },
    finduser:function (id,cb) {
    return this.findOne({username:id}).exec(cb)
}
}

module.exports=ClientSchema