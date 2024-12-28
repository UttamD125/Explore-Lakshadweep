const mongoose = require('mongoose');

const packageSchema = new mongoose.Schema({
  packageName: {
    type: String,
    required: true,
  },
  locations: {
    type: [String],
    required: true,
  },
  noOfDays: {
    type: Number,
    required: true,
  },
  noOfNights: {
    type: Number,
    required: true,
  },
  pricePerPerson: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  inclusions: {
    type: [String],
    required: true,
  },
  daywiseItenary: [
    {
      day: {
        type: Number,
        required: true,
      },
      details: {
        type: String,
        required: true,
      },
    },
  ],
});

const PackageModel = mongoose.model('PackageModel', packageSchema);

module.exports = PackageModel;
