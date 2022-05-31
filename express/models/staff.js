import mongoose from 'mongoose';

// This is creating collection for staff username and password
const StaffModel = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  staffRole: {
    type: String,
    enum: ['admin', 'staff'],
    default: 'staff',
  },
});

export default mongoose.model('Staff', StaffModel);
