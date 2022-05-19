import mongoose from 'mongoose';

// This is creating the UUID/reset password collection
const UserUUIDModel = new mongoose.Schema({
  UUID: String,
  username: String,
  email: String
  }
);

export default mongoose.model('user', UserUUIDModel);
