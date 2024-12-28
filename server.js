const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser'); 
const path = require('path');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const Admin = require('./models/adminModel');
const User = require('./models/userModel');
const Package = require('./models/packageModel');
const ToFlights = require('./models/toFlightsModel');
const FromFlights = require('./models/fromFlightsModel');
const ToCruise = require('./models/toCruiseModel');
const FromCruise = require('./models/fromCruiseModel');
const Newsletter = require('./models/newsletterModel');
const Contact = require('./models/contactModel');

const indexRoutes = require('./routes/indexRoutes');
const authRoutes = require('./routes/authRoutes');
const packageRoutes = require('./routes/packageRoutes');
const flightRoutes = require('./routes/flightRoutes');
const cruiseRoutes = require('./routes/cruiseRoutes');
const uploadRoutes = require('./routes/uploadRoutes');
const adminRoutes = require('./routes/adminRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware for cookies
app.use(cookieParser());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/lakshadweep', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log('Error connecting to MongoDB:', err));

// Set EJS as templating engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', uploadRoutes);
app.use('/', adminRoutes);

// Routes
app.use('/', indexRoutes);
app.use(authRoutes);
app.use(packageRoutes);
app.use(flightRoutes);
app.use(cruiseRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
