const mongoose = require("mongoose");

//usr schema
const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    pass:{
        type:String,
        required:true
    },
    mobile:{
        type:Number,
        required:true
    }
},{
    timestamps:true,
    versionKey:false
})

const UserModel = mongoose.model("users",userSchema)

module.exports = {
    UserModel
}


