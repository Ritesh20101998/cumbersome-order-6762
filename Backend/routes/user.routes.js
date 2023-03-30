const express = require("express")
const userRouter = express.Router()
const {UserModel}=require("../model/user.model")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

//welcome
userRouter.get("/get",(req,res)=>{
    res.send("Welcome")
})

//registration
userRouter.post("/register",async(req,res)=>{
    const {name,email,pass,mobile} = req.body
    try{
        bcrypt.hash(pass, 5, async(err, hash) => {
            // Store hash in your password DB.
            const user = new UserModel({name,email, pass:hash,mobile,})
            await user.save()
            res.status(200).send({"msg":"Registration successfully done.."})
        });

        // const user = new UserModel(req.body)
        // await user.save()
        // res.status(200).send({"msg":"Registration successfully done.."})
    } catch(err){
        res.status(400).send({"msg":err.message})
    }
})

//login
userRouter.post("/login",async(req,res)=>{
    const{email,pass}=req.body
    try{
        const user = await UserModel.findOne({email})
        console.log(user)

        // user.length>0 ? res.status(200).send({"msg":"Login successfully done..","token":jwt.sign({name:'batman'},'bruce')}) : 
        // res.status(400).send({"msg":"Login Failed.."})

        //Or

        if(user){
            bcrypt.compare(pass, user.pass, (err, result) =>{
                // result == true
                if(result){
                    res.status(200).send({"msg":"Login successfully done..","token":jwt.sign({"userId":user._id},"masai")})
                } else {
                    res.status(400).send({"msg":"Wrong Credentials"})
                }
            });
            
        } else {
            res.status(400).send({"msg":"Login Failed.."})
        }
        
    } catch (err) {
        res.status(400).send({"msg":err.message})
    }
    
})


module.exports = {
    userRouter
}