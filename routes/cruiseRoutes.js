const express = require('express');
const FromCruiseModel = require('../models/fromCruiseModel');
const ToCruiseModel = require('../models/toCruiseModel');
const UserModel = require('../models/userModel');
const router = express.Router();


router.get('/cruise', async (req, res) => {
  const defaultProfileImage = '/media/icons/lakshdweep.png';
  const profileImage = req.cookies.profileImage || defaultProfileImage;

  try {
      
      const fromCruise = await FromCruiseModel.find();
      const toCruise = await ToCruiseModel.find();

      
      res.render('cruise', {
          fromCruise: fromCruise,
          toCruise: toCruise,
          profileImage: profileImage
      });
  } catch (error) {
      console.error("Error fetching cruise data: ", error.message);
      res.status(500).send("Server Error");
  }
});

router.post('/cruiseBooking', async (req, res) => {
    const { from, to, departureDate, returnDate, adults, children, tripType } = req.body;
    const username = req.cookies.userName; 

    if (!username) {
        
        return res.status(401).json({ message: "You need to login to book a cruise." });
    }

    try {
        
        const user = await UserModel.findOne({ username });

        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        
        const cruiseBooking = {
            from,
            to,
            departureDate,
            returnDate,
            adults,
            children,
            roundTrip: tripType === 'two-way', 
        };

        
        user.bookings.cruises.push(cruiseBooking);

        
        await user.save();

        return res.send("<script>alert('Cruise booking successful.');window.location.href = '/cruisestatus';</script>");

    } catch (error) {
        console.error("Error saving cruise booking:", error.message);
        res.status(500).json({ message: "Server error while booking cruise." });
    }
});


router.get('/cruisestatus', async (req, res) => {
    const username = req.cookies.userName; 

    if (!username) {
        return res.redirect('/'); 
    }

    try {
        const user = await UserModel.findOne({ username });

        if (!user) {
            return res.redirect('/'); 
        }

        
        const cruiseBookings = user.bookings.cruises;

        
        res.render('cruisestatus', {
            username: user.username,
            profileImage: user.profileImage || '/media/icons/lakshdweep.png',
            cruiseBookings: cruiseBookings, 
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});


router.post('/deleteCruiseBooking', async (req, res) => {
    const username = req.cookies.userName; 
    const bookingId = req.body.bookingId; 

    if (!username || !bookingId) {
        return res.status(400).json({ success: false, message: "Invalid request." });
    }

    try {
        
        const user = await UserModel.findOne({ username });

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found." });
        }

        
        const bookingIndex = user.bookings.cruises.findIndex(booking => booking._id.toString() === bookingId);

        if (bookingIndex === -1) {
            return res.status(404).json({ success: false, message: "Booking not found." });
        }

        
        user.bookings.cruises.splice(bookingIndex, 1);

        
        await user.save();

        
        res.json({ success: true, message: 'Cruise booking deleted successfully.' });
    } catch (error) {
        console.error("Error deleting cruise booking:", error.message);
        res.status(500).json({ success: false, message: "Server error while deleting booking." });
    }
});



module.exports = router;
