import mongoose from 'mongoose';

// This is creating the UUID/reset password collection
const PasswordResetModel = new mongoose.Schema({
  UUID: String,
  username: String,
  email: String
  }
);

export default mongoose.model('password resets', PasswordResetModel);
