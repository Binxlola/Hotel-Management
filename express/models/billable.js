import mongoose from 'mongoose';

// This is creating the billable collection
const BillableModel = new mongoose.Schema({
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'category',
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  cost: {
    type: Number,
    required: true,
  },
});

export default mongoose.model('Billables', BillableModel);
