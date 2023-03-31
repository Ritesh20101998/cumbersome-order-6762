const mongoose = require("mongoose")

//usr schema
const userSchema=mongoose.Schema({
    name:String,
    email:String,
    pass:String,
    mobile:Number
},{
    versionKey:false
})

const UserModel = mongoose.model("user",userSchema)

module.exports = {
    UserModel
}