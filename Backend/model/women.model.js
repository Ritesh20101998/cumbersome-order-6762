const mongoose = require("mongoose");

//usr schema
const womenSchema=mongoose.Schema({
    image:{
        type: String, 
        required: true
    },
    title:{
        type:String,
        required:true,
    },
    price:{
        type: Number, 
        required: true
    },
    mrp:{
        type: Number, 
        required: true
    },
    rating:{
        type: Number, 
        required: true
    },
    review:{
        type: Number, 
        required: true
    },     
},{
    versionKey:false,
    timestamps:true
})

const womenModel = mongoose.model("women",womenSchema)

module.exports = {
    womenModel
}