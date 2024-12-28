const mongoose = require('mongoose');

const toFlightsSchema = new mongoose.Schema({
  cityName: {
    type: String,
    required: true, 
    unique: true,   
    trim: true      
  }
});

const ToFlightsModel = mongoose.model('ToFlightsModel', toFlightsSchema);

module.exports = ToFlightsModel;
