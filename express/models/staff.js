import mongoose from 'mongoose';

const StaffModel = new mongoose.Schema({
  username: String,
  password: String,
});

export default mongoose.model('Staff', StaffModel);
