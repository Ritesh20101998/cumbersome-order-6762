const mongoose = require("mongoose");

//usr schema
const jwellerySchema=mongoose.Schema({
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

const jwelleryModel = mongoose.model("jwellery",jwellerySchema)

module.exports = {
    jwelleryModel
}