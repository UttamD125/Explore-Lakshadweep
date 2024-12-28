const express = require('express');
const FromFlightsModel = require('../models/fromFlightsModel');
const ToFlightsModel = require('../models/toFlightsModel');
const UserModel = require('../models/userModel');
const router = express.Router();


router.get('/flights', async (req, res) => {
  const defaultProfileImage = '/media/icons/lakshdweep.png';
  const profileImage = req.cookies.profileImage || defaultProfileImage;

  try {
    
    const fromFlights = await FromFlightsModel.find();
    const toFlights = await ToFlightsModel.find();

    
    res.render('flights', {
      fromFlights: fromFlights,
      toFlights: toFlights,
      profileImage: profileImage
    });
  } catch (error) {
    console.error("Error fetching flights data: ", error.message);
    res.status(500).send("Server Error");
  }
});


router.post('/flightBooking', async (req, res) => {
  const { from, to, departureDate, returnDate, adults, children, tripType } = req.body;
  const username = req.cookies.userName; 

  if (!username) {
      
      return res.status(401).json({ message: "You need to login to book a flight." });
  }

  try {
      
      const user = await UserModel.findOne({ username });

      if (!user) {
          return res.status(404).json({ message: "User not found." });
      }

      
      const flightBooking = {
          from,
          to,
          departureDate,
          returnDate,
          adults,
          children,
          roundTrip: tripType === 'two-way', 
      };

      
      user.bookings.flights.push(flightBooking);

      
      await user.save();

      return res.send("<script>alert('Flight booking successful.');window.location.href = '/flightsstatus';</script>");
      res.status(200).json({ message: "Flight booking successful." });
  } catch (error) {
      console.error("Error saving flight booking:", error.message);
      res.status(500).json({ message: "Server error while booking flight." });
  }
});


router.get('/flightsstatus', async (req, res) => {
  const username = req.cookies.userName; 

  if (!username) {
      return res.redirect('/'); 
  }

  try {
      const user = await UserModel.findOne({ username });

      if (!user) {
          return res.redirect('/'); 
      }

      
      const flightBookings = user.bookings.flights;

      
      res.render('flightsstatus', {
          username: user.username,
          profileImage: user.profileImage || '/media/icons/lakshdweep.png',
          flightBookings: flightBookings, 
      });
  } catch (err) {
      console.error(err);
      res.status(500).send('Server error');
  }
});


router.post('/deleteFlightBooking', async (req, res) => {
    const username = req.cookies.userName; 
    const bookingId = req.body.bookingId; 

    if (!username || !bookingId) {
        return res.status(400).json({ message: "Invalid request." });
    }

    try {
        
        const user = await UserModel.findOne({ username });

        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        
        const bookingIndex = user.bookings.flights.findIndex(booking => booking._id.toString() === bookingId);

        if (bookingIndex === -1) {
            return res.status(404).json({ message: "Booking not found." });
        }

        
        user.bookings.flights.splice(bookingIndex, 1);

        
        await user.save();

        
        res.send("<script>alert('Flight booking deleted successfully.');window.location.href = '/flightsstatus';</script>");
    } catch (error) {
        console.error("Error deleting flight booking:", error.message);
        res.status(500).send("Server error while deleting booking.");
    }
});



module.exports = router;
