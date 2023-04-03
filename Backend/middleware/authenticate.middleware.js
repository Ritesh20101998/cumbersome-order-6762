const jwt = require("jsonwebtoken")

const authenticate = (req,res,next)=>{
    const token = req.headers.authorization.split(" ")[1] 
    if(token){
        const decoded = jwt.verify(token,"masai")
        if(decoded){
            req.body.userId=decoded.userId
            console.log(decoded)
            next()
        }else{
            res.status(400).send({"msg":"Please login first!"})
        }
    } else {
        res.status(400).send({"msg":"Please login first!"})
    }
}

module.exports = {
    authenticate
}