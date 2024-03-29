const express = require("express")
const cors = require("cors")

const app = express()
app.use(express.json())
app.use(cors())
require("dotenv").config()

// routes
const {connection}= require("./config/db")
const authenticate = require("./middleware/authenticate.middleware")
const {userRouter} = require("./routes/user.routes") 
const {menRouter} = require("./routes/men.routes") 
const {womenRouter} = require("./routes/women.routes")
const {jwelleryRouter} = require("./routes/jwellery.routes")


app.use("/users",userRouter)
app.use("/authenticate",authenticate)
app.use("/men",menRouter)
app.use("/women",womenRouter)
app.use("/jwelleries",jwelleryRouter)

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
    console.log(`Server is running at port ${process.env.port}`)
})

