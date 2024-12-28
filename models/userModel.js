const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  profileImage: { 
    type: String, 
    default: '/public/media/icons/lakshdweep.png' 
  },
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  bookings: {
    flights: [
      {
        from: {
          type: String,
          required: true,
        },
        to: {
          type: String,
          required: true,
        },
        departureDate: {
          type: Date,
          required: true,
        },
        returnDate: {
          type: Date,
          validate: {
            validator: function (value) {
              return !this.roundTrip || !!value;
            },
            message: 'Return date is required for round-trip flights.',
          },
        },
        adults: {
          type: Number,
          required: true,
          min: 1,
        },
        children: {
          type: Number,
          default: 0,
        },
        roundTrip: {
          type: Boolean,
          default: false,
        },
        status: {
          type: String,
          enum: ['Pending', 'Approved', 'Rejected'], 
          default: 'Pending', 
        },
      },
    ],
    cruises: [
      {
        from: {
          type: String,
          required: true,
        },
        to: {
          type: String,
          required: true,
        },
        departureDate: {
          type: Date,
          required: true,
        },
        returnDate: {
          type: Date,
          validate: {
            validator: function (value) {
              
              return !this.roundTrip || !!value;
            },
            message: 'Return date is required for round-trip cruises.',
          },
        },
        adults: {
          type: Number,
          required: true,
          min: 1,
        },
        children: {
          type: Number,
          default: 0,
        },
        roundTrip: {
          type: Boolean,
          default: false,
        },
        status: {
          type: String,
          enum: ['Pending', 'Approved', 'Rejected'], 
          default: 'Pending', 
        },
      },
    ],
    packages: [
      {
        packageName: {
          type: String,
          required: true,
        },
        numberOfPersons: {
          type: Number,
          required: true,
          min: 1,
        },
        preferredDate: {
          type: Date,
          required: true,
        },
        totalPrice: {
          type: Number,
          required: true,
          min: 0,
        },
        status: {
          type: String,
          enum: ['Pending', 'Approved', 'Rejected'], 
          default: 'Pending', 
        },
      },
    ],
  },
});



const UserModel = mongoose.model('UserModel', userSchema);


module.exports = UserModel;
