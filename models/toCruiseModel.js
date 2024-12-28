const mongoose = require('mongoose');

const toCruiseSchema = new mongoose.Schema({
  cityName: {
    type: String,
    required: true, 
    unique: true,   
    trim: true      
  }
});

const ToCruiseModel = mongoose.model('ToCruiseModel', toCruiseSchema);

module.exports = ToCruiseModel;
