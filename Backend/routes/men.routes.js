const express = require("express")
const menRouter = express.Router()
const {MenModel}=require("../model/men.model")
const jwt = require("jsonwebtoken")

menRouter.get("/",(req,res)=>{
    res.send("Welcome")
})

menRouter.get("/get",async(req,res)=>{
    const token = req.headers.authorization.split(" ")[1]
    console.log(token)
    const decoded = jwt.verify(token,"masai")
    console.log(decoded)
    try{
        if(decoded){
            const menProduct=await MenModel.find({"userId":decoded.userId});
            console.log(menProduct)
            res.status(200).send(menProduct)
        }
         else {
            res.status(400).send({"msg":"No product has been created by this user"})
        }
        
    } catch(err){
        res.status(400).send({"msg":err.message})
    }
})

menRouter.post("/add",async(req,res)=>{
    try{
        const menProduct = new MenModel(req.body)
        await menProduct.save()
        res.status(200).send({"msg":"A new product has been added"})
    } catch(err){
        res.status(400).send({"msg":err.message})
    }
})

module.exports = {
    menRouter
}