const { userRoles } = require('../../enums');
const { comparePassword } = require('../../utils/crypto');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    trim: true,
    required: true,
  },
  hash_password: {
    type: String,
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

UserSchema.methods.verifyPassword = function (password) {
  return comparePassword(password, this.hash_password);
};

mongoose.model('User', UserSchema);

exports.UserSchema = UserSchema;
