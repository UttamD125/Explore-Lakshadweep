const express = require('express');
const router = express.Router();
const UserModel = require('../models/userModel');

router.get('/', (req, res) => {
  const defaultProfileImage = '/media/icons/lakshdweep.png';
  const profileImage = req.cookies.profileImage || defaultProfileImage;
  res.render('index', { profileImage });
});

router.get('/islands', (req, res) => {
  const defaultProfileImage = '/media/icons/lakshdweep.png';
  const profileImage = req.cookies.profileImage || defaultProfileImage;
  res.render('islands', { profileImage });
});

router.get('/about', (req, res) => {
  const defaultProfileImage = '/media/icons/lakshdweep.png';
  const profileImage = req.cookies.profileImage || defaultProfileImage;
  res.render('about', { profileImage });
});

router.get('/package', (req, res) => {
  const defaultProfileImage = '/media/icons/lakshdweep.png';
  const profileImage = req.cookies.profileImage || defaultProfileImage;
  res.render('package', { profileImage });
});



module.exports = router;
