const { userRoles } = require('../../enums');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    trim: true,
    required: true,
  },
  email: {
    type: String,
    trim: true,
    required: true,
  },
  mobile: {
    type: String,
    trim: true,
    required: true,
  },
  role: {
    type: String,
    default: userRoles.CLIENT,
  },
});

const User = mongoose.model('User', UserSchema);

exports.User = User;
