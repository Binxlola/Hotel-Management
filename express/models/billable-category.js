import mongoose from 'mongoose';

// This is creating the customer collection
const BillableCategoryModel = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

export default mongoose.model('Billable Categories', BillableCategoryModel);
