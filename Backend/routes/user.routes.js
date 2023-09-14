// user.routes.js
const express = require("express")
const userRouter = express.Router()
const {UserModel}=require("../model/user.model")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const crypto = require('crypto'); 
const nodemailer = require('nodemailer'); 
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

// Generate and send a reset password email
userRouter.post('/forgot-password', async (req, res) => {
    try {
      const { email } = req.body;
      const user = await UserModel.findOne({ email });
  
      if (!user) {
        return res.status(404).json({ message: 'User not found.' });
      }
  
      // Generate a unique reset token and set its expiration date
      const resetToken = crypto.randomBytes(20).toString('hex');
      const resetTokenExpiration = new Date();
      resetTokenExpiration.setHours(resetTokenExpiration.getHours() + 1); // Token expires in 1 hour
  
      // Store the token and its expiration date in the user's document
      user.resetToken = resetToken;
      user.resetTokenExpiration = resetTokenExpiration;
      await user.save();
  
      // Send an email with the reset token (you'll need to configure a nodemailer transport)
      const transporter = nodemailer.createTransport({
        // Configure your email provider here
        // For example, for Gmail, you can use the 'nodemailer-smtp-transport' package
      });
  
      const mailOptions = {
        to: user.email,
        subject: 'Password Reset',
        text: `You are receiving this email because you (or someone else) requested a password reset for your account.\n\n`
          + `Please click on the following link, or paste this into your browser to reset your password:\n\n`
          + `http://localhost:3000/reset-password/${resetToken}\n\n`
          + `If you did not request this, please ignore this email and your password will remain unchanged.\n`,
      };
  
      await transporter.sendMail(mailOptions);
  
      res.json({ message: 'Password reset email sent successfully.' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error.' });
    }
});

// Reset the password
userRouter.post('/reset-password/:resetToken', async (req, res) => {
    try {
      const { resetToken } = req.params;
      const { newPassword } = req.body;
  
      const user = await UserModel.findOne({
        resetToken,
        resetTokenExpiration: { $gt: new Date() }, // Check if the token is still valid
      });
  
      if (!user) {
        return res.status(400).json({ message: 'Invalid or expired token.' });
      }
  
      // Hash the new password and update it in the user's document
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(newPassword, salt);
      user.password = hashedPassword;
  
      // Clear the reset token and its expiration date
      user.resetToken = undefined;
      user.resetTokenExpiration = undefined;
      await user.save();
  
      res.json({ message: 'Password reset successfully.' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error.' });
    }
});
  
  // ... (existing routes)
  


module.exports = {
    userRouter
}