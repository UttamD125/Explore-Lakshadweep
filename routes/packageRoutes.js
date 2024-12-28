const express = require('express');
const UserModel = require('../models/userModel');
const router = express.Router();

router.post('/bookPackage', async (req, res) => {
  try {
      const { packageName, numPersons, date, totalPrice } = req.body;
      const username = req.cookies.userName;

      if (!username) {
          return res.status(401).json({ message: "You need to login to book a package." });
      }

      const user = await UserModel.findOne({ username });

      if (!user) {
          return res.status(404).send('User not found');
      }

      const newBooking = {
          packageName,
          numberOfPersons: numPersons,
          preferredDate: date,
          totalPrice
      };

      
      user.bookings.packages.push(newBooking);

      
      await user.save();

      
      
      return res.send("<script>alert('Package booked successfully');window.location.href = '/packagestatus';</script>");
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.get('/packageStatus', async (req, res) => {
  try {
      const username = req.cookies.userName;

      if (!username) {
          return res.redirect('/login');
      }

      const user = await UserModel.findOne({ username });

      if (!user) {
          return res.status(404).send('User not found');
      }

      const packageBookings = user.bookings.packages;
      const profileImage = user.profileImage || '/media/images/default-profile.png'; 

      res.render('packagestatus', { 
          username: user.username, 
          profileImage, 
          packageBookings 
      });
  } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
  }
});



router.post('/deletePackageBooking', async (req, res) => {
  try {
      const { bookingId } = req.body;
      const username = req.cookies.userName;

      if (!username) {
          return res.redirect('/login');
      }

      const user = await UserModel.findOne({ username });

      if (!user) {
          return res.status(404).send('User not found');
      }

      user.bookings.packages = user.bookings.packages.filter(
          (booking) => booking._id.toString() !== bookingId
      );

      await user.save();

      return res.send("<script>alert('Package deleted successfully');window.location.href = '/packagestatus';</script>");

  } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
  }
});



module.exports = router;
