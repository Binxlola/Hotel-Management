import mongoose from 'mongoose';

// This is creating collection for staff username and password
const StaffModel = new mongoose.Schema({
  username: String,
  password: String,
});

export default mongoose.model('Staff', StaffModel);
