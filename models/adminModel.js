const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const adminSchema = new mongoose.Schema({
  adminname: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true, 
    lowercase: true 
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  }
});

const AdminModel = mongoose.model('AdminModel', adminSchema);

module.exports = AdminModel;
