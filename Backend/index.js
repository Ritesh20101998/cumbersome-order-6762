const express =require("express")
const {connection}=require("./db")
const {userRouter} = require("./routes/user.routes") 
const {auth} = require("./middleware/authenticate.middleware")
const {menRouter} = require("./routes/men.routes") 
const cors = require("cors")
require("dotenv").config()
const app = express()
app.use(express.json())
app.use(cors())
app.use("/users",userRouter)
app.use(auth)
app.use("/men",menRouter)

app.get("/",(req,res)=>{
    res.send("Welcome")
})

app.listen(process.env.port,async()=>{
    try{
        await connection
        console.log("Connected to MongoDB Atlas")
    } catch (err){
        console.log(err.message)
        console.log("Not connected to MongoDB Atlas")
    }
    console.log(`server is running at port ${process.env.port}`)
})