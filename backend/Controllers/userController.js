const User = require("../Models/userModel")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

//  function Register : register new user 

const Register = async (req, res) => {
    try {
      const { firstName, lastName,  email, password } = req.body;
      if(password.length < 6) {
        res.status(400).json({ errors: [{ msg: 'Password must be at least 6 characters long' }] });
        } 
      const user = await User.findOne({Email:email});
      if (user) res.status(400).json({ errors: [{ msg: 'user already exist!!!!' }] });
      const newUser = new User({        
        FirstName:firstName,
        LastName:lastName, 
        Email:email,
        Password:password});
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(newUser.Password, salt);
      newUser.Password = hash;  
      const registredUser = await newUser.save();    
      const payload = { sub: registredUser._id }; 

  
      const token = jwt.sign(payload, process.env.SECRET_KEY);
      const filteredUser = {
        firstName,
        lastName,
        email,
        _id: registredUser._id,
        Role: registredUser.Role,
      };
      
      res.json({ token, user: filteredUser });
    } catch (err) {
      res.status(500).json({ errors: [{ msg: err.message }] });
    }
  }

// function Login : login user already registred 

const Login = async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({Email:email});
      if (!user) return res.status(400).json({ errors: { msg: 'please register before' } });
      const isMatch = await bcrypt.compare(password, user.Password);
      if (!isMatch) return res.status(400).json({ errors: { msg: 'wrong password' } });
      const payload = { sub: user._id };
      const token = await jwt.sign(payload, process.env.SECRET_KEY);
      const filteredUser = {
        firstName: user.FirstName,
        lastName: user.LastName,
        email,
        _id: user._id,
        role: user.Role,
      };
      res.json({ token, user: filteredUser });
    } catch (err) { 
      res.status(500).json({ errors: [{ msg: err.message }] });
    } 
  }

  //function GetAllUsers : get all users 
  const GetAllUsers = async(req, res) =>{
    try {
        const users = await User.find({})
        res.json(users)
    } catch (error) {
        res.status(500).json({ errors: [{ msg: error.message }] });
    }
}

  module.exports = {Register,Login,GetAllUsers}