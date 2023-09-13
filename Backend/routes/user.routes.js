// user.routes.js
const express = require("express")
const userRouter = express.Router()
const {UserModel}=require("../model/user.model")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const authenticate = require("../middleware/authenticate.middleware")
require('dotenv').config()
const SECRET_KEY = process.env.secret_key

//welcome
userRouter.get("/",(req,res)=>{
    res.send("Welcome to user section")
})

// Register a new user
userRouter.post('/register', async (req, res) => {
    try {
      const { name, email, pass, mobile } = req.body;
      
      // Check if the user with the same email already exists
      const existingUser = await UserModel.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'Email already exists.' });
      }
  
      // Hash the password before saving it
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(pass, salt);
  
      // Create a new user
      const newUser = new UserModel({ name, email, pass: hashedPassword, mobile });
      await newUser.save();
  
      res.status(201).json({ message: 'User registered successfully.' });
    } catch (error) {
      res.status(500).json({ message: 'Internal server error.', error : error});
    }
});
  
// Login a user
userRouter.post('/login', async (req, res) => {
    try {
      const { email, pass } = req.body;
  
      // Find the user by email
      const user = await UserModel.findOne({ email });
  
      // Check if the user exists
      if (!user) {
        return res.status(400).json({ message: 'Invalid email or password.' });
      }
  
      // Verify the password
      const validPassword = await bcrypt.compare(pass, user.pass);
      if (!validPassword) {
        return res.status(400).json({ message: 'Invalid email or password.' });
      }
  
      // Generate and return a JWT token
      const token = jwt.sign({ id: user._id, email: user.email }, SECRET_KEY);
      res.status(201).json({ message: 'User registered successfully.' , token});
    } catch (error) {
      res.status(500).json({ message: 'Internal server error.' });
    }
});
  
  // A protected route for testing authentication
userRouter.get('/profile', authenticate, (req, res) => {
    res.json({ user: req.user });
});


module.exports = {
    userRouter
}