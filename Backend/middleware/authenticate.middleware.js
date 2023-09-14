const jwt = require("jsonwebtoken")

const authenticate = (req,res,next)=>{
    const token = req.header('Authorization');

  if (!token) return res.status(401).json({ message: 'Access denied. Token not provided.' });

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid token.' });
    req.user = user;
    next();
  });
}

module.exports = authenticate
