const mongoose = require('mongoose');

const fromFlightsSchema = new mongoose.Schema({
  cityName: {
    type: String,
    required: true, 
    unique: true,   
    trim: true      
  }
});

const FromFlightsModel = mongoose.model('FromFlightsModel', fromFlightsSchema);

module.exports = FromFlightsModel;
