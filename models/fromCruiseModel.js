const mongoose = require('mongoose');

const fromCruiseSchema = new mongoose.Schema({
  cityName: {
    type: String,
    required: true,
    unique: true,  
    trim: true     
  }
});

const FromCruiseModel = mongoose.model('FromCruiseModel', fromCruiseSchema);

module.exports = FromCruiseModel;
