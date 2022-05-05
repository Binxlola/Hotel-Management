import mongoose from 'mongoose';

// This is creating the customer collection
const CustomerModel = new mongoose.Schema({
  username: String,
  password: String,
  first_name: String,
  last_name: String,
  email: String,
  last_logon: Date,
  registration_date: {
    type: Date,
    default: Date.now(),
  },
});

export default mongoose.model('Customers', CustomerModel);
