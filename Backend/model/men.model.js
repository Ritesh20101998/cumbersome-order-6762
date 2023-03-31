const mongoose = require("mongoose")

//usr schema
const menSchema=mongoose.Schema({
    name:String,
    price:Number,
    delivery:String,
    star:Number,
    Reviews:Number,
    userId:String
},{
    versionKey:false
})

const MenModel = mongoose.model("men",menSchema)

module.exports = {
    MenModel
}