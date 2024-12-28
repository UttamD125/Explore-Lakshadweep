const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const UserModel = require('../models/userModel'); 
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser'); 

const router = express.Router();


router.use(cookieParser());


router.post('/register', async (req, res) => {
  const { username, email, password, profileImage } = req.body;

  if (!username || !email || !password) {
      return res.status(400).json({ message: 'username, email, and password are required fields' });
  }

  
  const existingUser = await UserModel.findOne({ email });
  if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
  }

  
  const hashedPassword = await bcrypt.hash(password, 10);

  const defaultProfileImage = '/media/icons/lakshdweep.png';

  
  const newUser = new UserModel({
      username,
      email,
      password: hashedPassword,
      profileImage: profileImage || defaultProfileImage,  
  });

  try {
      
      await newUser.save();

      
      res.cookie('userId', newUser._id, {
          httpOnly: false,  
          maxAge: 3600000,  
          secure: false,    
          sameSite: 'strict',
      });
      res.cookie('userName', newUser.username, {
          httpOnly: false,  
          maxAge: 3600000,  
          secure: false,    
          sameSite: 'strict',
      });
      res.cookie('userName', newUser.username, {
        httpOnly: false,  
        maxAge: 3600000,  
        secure: false,    
        sameSite: 'strict',
      });

      
      res.redirect('/packagestatus');
  } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error creating user' });
  }
});


router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
      
      const user = await UserModel.findOne({ email });
      if (!user) {
          return res.status(400).json({ message: 'Invalid email or password' });
      }

      
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
          return res.status(400).json({ message: 'Invalid email or password' });
      }

      
      res.cookie('userId', user._id, {
          httpOnly: true,
          maxAge: 3600000,
          secure: false,
          sameSite: 'strict',
      });
      res.cookie('profileImage', user.profileImage || '/public/media/icons/lakshdweep.png', {
          httpOnly: true,
          maxAge: 3600000,
          secure: false,
          sameSite: 'strict',
      });
      res.cookie('userName', user.username, {
        httpOnly: false,  
        maxAge: 3600000,  
        secure: false,    
        sameSite: 'strict',
      });

      
      res.redirect('/cruisestatus');
  } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error logging in' });
  }
});


router.get('/logout', (req, res) => {
  
  res.clearCookie('userId');
  res.clearCookie('userName');
  res.clearCookie('profileImage');
  
  
  res.redirect('/');
});


module.exports = router;
