const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please enter a name'],
    },
    email: {
      type: String,
      required: [true, 'Please enter an email'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Please enter a password'],
      minLength: [6, 'Password must be at least 6 characters'],
    },
    profile_pic: {
      type: String,
      default: '',
    },
  },
  { timestamps: true }
);
const UserModel = mongoose.model('user', UserSchema);
module.exports = UserModel;
