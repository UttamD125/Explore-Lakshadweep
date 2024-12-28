const express = require('express');
const jwt = require('jsonwebtoken');
const Admin = require('../models/adminModel');
const FromFlightsModel = require('../models/fromFlightsModel');
const ToFlightsModel = require('../models/toFlightsModel');
const FromCruiseModel = require('../models/fromCruiseModel');
const ToCruiseModel = require('../models/toCruiseModel');
const UserModel = require('../models/userModel');
const Newsletter = require('../models/newsletterModel');
const Contact = require('../models/contactModel');
const multer = require('multer');
const path = require('path');
const PackageModel = require('../models/packageModel');
const router = express.Router();

router.post('/loginadmin', async (req, res) => {
  const { email, password } = req.body;

  try {
      const admin = await Admin.findOne({ email });
      if (!admin || admin.password !== password) {
          return res.status(400).json({ message: 'Invalid credentials' });
      }

      const token = jwt.sign(
          { id: admin._id, email: admin.email },
          process.env.JWT_SECRET || 'secret',
          { expiresIn: '1h' }
      );

      res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });
      res.redirect('/adminpage'); 
  } catch (err) {
      console.error('Login error:', err.message);
      res.status(500).json({ message: 'Server error' });
  }
});

function authenticateAdmin(req, res, next) {
  const token = req.cookies.token; 
  if (!token) {
      return res.redirect('/adminloginpage'); 
  }

  try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret');
      req.admin = decoded; 
      next(); 
  } catch (err) {
      console.error('Invalid token:', err.message);
      return res.redirect('/adminloginpage'); 
  }
}


router.get('/adminloginpage', (req, res) => {
  res.render('adminpage');
});

router.post('/addFromFlight', async (req, res) => {
  const { cityName } = req.body;

  try {
    
    if (!cityName || cityName.trim() === '') {
      return res.status(400).send('City name is required.');
    }

    
    const newCity = new FromFlightsModel({
      cityName: cityName.trim()
    });

    
    await newCity.save();

    
    return res.send("<script>alert('from flight added.');window.location.href = '/adminpage#add-fromflight';</script>");
  } catch (error) {
    console.error('Error adding city:', error.message);

    
    if (error.code === 11000) {
      res.status(400).send('City already exists.');
    } else {
      res.status(500).send('Server error. Please try again later.');
    }
  }
});



const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads'); 
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + ext); 
  }
});

const upload = multer({ storage: storage });


router.post('/addPackage', upload.single('packageImage'), async (req, res) => {
  try {
    
    const { packageName, packageNameLayout, days, price, options } = req.body;

    
    const locations = JSON.parse(req.body.locations || '[]');  
    const inclusions = JSON.parse(req.body.inclusions || '[]'); 
    
    
    const itinerary = JSON.parse(req.body.itinerary || '[]').map((detail, index) => ({
      day: index + 1,
      details: detail
    }));

    
    const newPackage = new PackageModel({
      packageName,
      packageNameLayout,
      locations,  
      noOfDays: parseInt(days),  
      noOfNights: parseInt(days) - 1,  
      pricePerPerson: parseFloat(price), 
      image: req.file ? req.file.filename : '', 
      inclusions, 
      daywiseItenary: itinerary 
    });

    
    await newPackage.save();

    
    res.redirect('/adminpage');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error adding package. Please try again later.');
  }
});


router.post('/addToFlight', async (req, res) => {
  const { cityName } = req.body;

  try {
    
    if (!cityName || cityName.trim() === '') {
      return res.status(400).send('City name is required.');
    }

    
    const newCity = new ToFlightsModel({
      cityName: cityName.trim()
    });

    
    await newCity.save();

    
    return res.send("<script>alert('to flight added.');window.location.href = '/adminpage#add-toflight';</script>");
  } catch (error) {
    console.error('Error adding city:', error.message);

    
    if (error.code === 11000) {
      res.status(400).send('City already exists.');
    } else {
      res.status(500).send('Server error. Please try again later.');
    }
  }
});


router.post('/addFromCruise', async (req, res) => {
  const { cityName } = req.body;

  try {
    
    if (!cityName || cityName.trim() === '') {
      return res.status(400).send('City name is required.');
    }

    
    const newCity = new FromCruiseModel({
      cityName: cityName.trim()
    });

    
    await newCity.save();

    
    return res.send("<script>alert('from cruise added.');window.location.href = '/adminpage#add-fromcruise';</script>");
  } catch (error) {
    console.error('Error adding city:', error.message);

    
    if (error.code === 11000) {
      res.status(400).send('City already exists.');
    } else {
      res.status(500).send('Server error. Please try again later.');
    }
  }
});


router.post('/addToCruise', async (req, res) => {
  const { cityName } = req.body;

  try {
    
    if (!cityName || cityName.trim() === '') {
      return res.status(400).send('City name is required.');
    }

    
    const newCity = new ToCruiseModel({
      cityName: cityName.trim()
    });

    
    await newCity.save();
    return res.send("<script>alert('to cruise added.');window.location.href = '/adminpage#add-tocruise';</script>");
  } catch (error) {
    console.error('Error adding city:', error.message);

    
    if (error.code === 11000) {
      res.status(400).send('City already exists.');
    } else {
      res.status(500).send('Server error. Please try again later.');
    }
  }
});


router.post('/addNewsletter', async (req, res) => {
  const { email } = req.body;

  try {
    
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      return res.status(400).send('Valid email is required.');
    }

    
    const newSubscription = new Newsletter({ email });
    await newSubscription.save();

    return res.send("<script>alert('Newsletter subscription added successfully.');window.history.back();</script>");
  } catch (error) {
    console.error('Error adding newsletter subscription:', error.message);

    
    if (error.code === 11000) {
      res.status(400).send('Email is already subscribed.');
    } else {
      res.status(500).send('Server error. Please try again later.');
    }
  }
});


router.post('/contactus', async (req, res) => {
  const { name, email, message } = req.body;

  try {
    
    if (!name || !email || !message) {
      return res.status(400).send('All fields are required.');
    }

    
    const newContact = new Contact({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      message: message.trim()
    });

    
    await newContact.save();

    return res.send("<script>alert('Thank you for contacting us!');window.history.back();</script>");
  } catch (error) {
    console.error('Error saving contact form data:', error.message);
    res.status(500).send('Server error. Please try again later.');
  }
});


router.get('/adminpage', authenticateAdmin, async (req, res) => {
  try {
    
    const fromFlights = await FromFlightsModel.find();
    const toFlights = await ToFlightsModel.find();

    
    const fromCruises = await FromCruiseModel.find();
    const toCruises = await ToCruiseModel.find();

    
    const users = await UserModel.find();

    const newsletters = await Newsletter.find();
    const contactQueries = await Contact.find();

    
    const flightBookings = [];
    const cruiseBookings = [];
    const packageBookings = [];  

    users.forEach(user => {
      
      user.bookings.flights.forEach(booking => {
        flightBookings.push({
          _id: booking._id,
          username: user.username,
          email: user.email,
          from: booking.from,
          to: booking.to,
          departureDate: booking.departureDate,
          returnDate: booking.returnDate,
          adults: booking.adults,
          children: booking.children,
          status: booking.status || 'Pending' 
        });
      });

      
      user.bookings.cruises.forEach(booking => {
        cruiseBookings.push({
          _id: booking._id,
          username: user.username,
          email: user.email,
          from: booking.from,
          to: booking.to,
          departureDate: booking.departureDate,
          returnDate: booking.returnDate,
          adults: booking.adults,
          children: booking.children,
          status: booking.status || 'Pending' 
        });
      });

      
      user.bookings.packages.forEach(booking => {
        packageBookings.push({
          _id: booking._id,
          username: user.username,
          email: user.email,
          packageName: booking.packageName,
          numberOfPersons: booking.numberOfPersons,
          preferredDate: booking.preferredDate,
          totalPrice: booking.totalPrice,
          status: booking.status || 'Pending' 
        });
      });
    });

    
    res.render('admin', { 
      admin: req.admin, 
      fromFlights, 
      toFlights, 
      fromCruises, 
      toCruises, 
      flightBookings,
      cruiseBookings,
      packageBookings, 
      newsletters,
      contactQueries
    });

  } catch (err) {
    console.error('Error fetching data:', err.message);
    res.status(500).send('Server Error');
  }
});



router.post('/approvePackageBooking', async (req, res) => {
  const { bookingId } = req.body;

  try {
    
    const user = await UserModel.findOneAndUpdate(
      { 'bookings.packages._id': bookingId },
      { $set: { 'bookings.packages.$.status': 'Approved' } }
    );

    if (!user) return res.status(404).send('Package booking not found.');

    res.status(200).send('Package booking approved.');
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error.');
  }
});



router.post('/rejectPackageBooking', async (req, res) => {
  const { bookingId } = req.body;

  try {
    
    const user = await UserModel.findOneAndUpdate(
      { 'bookings.packages._id': bookingId },
      { $set: { 'bookings.packages.$.status': 'Rejected' } }
    );

    if (!user) return res.status(404).send('Package booking not found.');

    res.status(200).send('Package booking rejected.');
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error.');
  }
});



router.post('/deletePackageBooking/:bookingId', async (req, res) => {
  const { bookingId } = req.params;

  try {
    
    const user = await UserModel.findOneAndUpdate(
      { 'bookings.packages._id': bookingId },
      { $pull: { 'bookings.packages': { _id: bookingId } } }
    );

    if (!user) return res.status(404).send('Package booking not found.');

    res.status(200).send('Package booking deleted.');
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error.');
  }
});





router.post('/deleteFlightBooking/:id', async (req, res) => {
  const { id } = req.params;

  try {
    
    const user = await UserModel.findOneAndUpdate(
      { 'bookings.flights._id': id }, 
      { $pull: { 'bookings.flights': { _id: id } } }, 
      { new: true } 
    );

    if (!user) {
      return res.status(404).send('Flight booking not found.');
    }

    return res.send("<script>alert('Flight booking deleted.');window.location.href = '/adminpage#manage-flightbooking';</script>");
  } catch (err) {
    console.error('Error deleting flight booking:', err.message);
    res.status(500).send('Server error.');
  }
});



router.post('/deleteCruiseBooking/:id', async (req, res) => {
  const { id } = req.params;

  try {
    
    const user = await UserModel.findOneAndUpdate(
      { 'bookings.cruises._id': id },
      { $pull: { 'bookings.cruises': { _id: id } } },
      { new: true }
    );

    if (!user) {
      return res.status(404).send('Booking not found.');
    }

    return res.send("<script>alert('Cruise booking deleted.');window.location.href = '/adminpage#manage-cruisebooking';</script>");
  } catch (err) {
    console.error('Error deleting cruise booking:', err.message);
    res.status(500).send('Server error.');
  }
});






router.post('/deleteNewsletter/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await Newsletter.findByIdAndDelete(id);
    return res.send("<script>alert('newsletter deleted.');window.location.href = '/adminpage#newsletter';</script>");
  } catch (error) {
    console.error('Error deleting newsletter:', error.message);
    res.status(500).send('Server error. Please try again later.');
  }
});

router.post('/deleteContact/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await Contact.findByIdAndDelete(id); 
    return res.send("<script>alert('query deleted.');window.location.href = '/adminpage#manage-query';</script>");
  } catch (error) {
    console.error('Error deleting contact query:', error.message);
    res.status(500).send('Server error. Please try again later.');
  }
});


router.post('/deleteFromFlight/:id', async (req, res) => {
  const { id } = req.params;

  try {
      await FromFlightsModel.findByIdAndDelete(id);
      return res.send("<script>alert('from flight deleted.');window.location.href = '/adminpage#manage-flight';</script>");
  } catch (error) {
      console.error('Error deleting city:', error.message);
      res.status(500).send('Server error. Please try again later.');
  }
});


router.post('/deleteToFlight/:id', async (req, res) => {
  const { id } = req.params;

  try {
      await ToFlightsModel.findByIdAndDelete(id);
      return res.send("<script>alert('to flight deleted.');window.location.href = '/adminpage#manage-flight';</script>");
  } catch (error) {
      console.error('Error deleting city:', error.message);
      res.status(500).send('Server error. Please try again later.');
  }
});


router.post('/deleteFromCruise/:id', async (req, res) => {
  const { id } = req.params;

  try {
      await FromCruiseModel.findByIdAndDelete(id);
      return res.send("<script>alert('from cruise deleted.');window.location.href = '/adminpage#manage-cruise';</script>");
  } catch (error) {
      console.error('Error deleting city:', error.message);
      res.status(500).send('Server error. Please try again later.');
  }
});


router.post('/deleteToCruise/:id', async (req, res) => {
  const { id } = req.params;

  try {
      await ToCruiseModel.findByIdAndDelete(id);
      return res.send("<script>alert('to cruise deleted.');window.location.href = '/adminpage#manage-cruise';</script>");
  } catch (error) {
      console.error('Error deleting city:', error.message);
      res.status(500).send('Server error. Please try again later.');
  }
});


router.post('/approveFlightBooking', async (req, res) => {
  const { bookingId } = req.body;

  try {
    const user = await UserModel.findOneAndUpdate(
      { 'bookings.flights._id': bookingId },
      { $set: { 'bookings.flights.$.status': 'Approved' } }
    );
    if (!user) return res.status(404).send('Booking not found.');
    res.status(200).send('Booking approved.');
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error.');
  }
});


router.post('/rejectFlightBooking', async (req, res) => {
  const { bookingId } = req.body;

  try {
    const user = await UserModel.findOneAndUpdate(
      { 'bookings.flights._id': bookingId },
      { $set: { 'bookings.flights.$.status': 'Rejected' } }
    );
    if (!user) return res.status(404).send('Booking not found.');
    res.status(200).send('Booking rejected.');
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error.');
  }
});



router.post('/approveCruiseBooking', async (req, res) => {
  const { bookingId } = req.body;

  try {
      
      const user = await UserModel.findOne({ 'bookings.cruises._id': bookingId });

      if (!user) {
          return res.status(404).send('Booking not found');
      }

      
      const booking = user.bookings.cruises.id(bookingId);
      booking.status = 'Approved';

      
      await user.save();

      res.status(200).send('Cruise booking approved');
  } catch (error) {
      console.error('Error approving booking:', error.message);
      res.status(500).send('Server error');
  }
});


router.post('/rejectCruiseBooking', async (req, res) => {
  const { bookingId } = req.body;

  try {
      
      const user = await UserModel.findOne({ 'bookings.cruises._id': bookingId });

      if (!user) {
          return res.status(404).send('Booking not found');
      }

      
      const booking = user.bookings.cruises.id(bookingId);
      booking.status = 'Rejected';

      
      await user.save();

      res.status(200).send('Cruise booking rejected');
  } catch (error) {
      console.error('Error rejecting booking:', error.message);
      res.status(500).send('Server error');
  }
});






router.get('/logoutadmin', (req, res) => {
  res.clearCookie('token'); 
  res.redirect('/adminloginpage'); 
});

module.exports = router;
