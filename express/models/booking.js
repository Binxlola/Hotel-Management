import mongoose from 'mongoose';
import { version as uuidVersion, validate as uuidValidate } from 'uuid';

const bookingModel = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'customers',
    required: false,
  },
  bookingName: {
    type: String,
    required: [true, 'Booking requires a reservation name'],
  },
  room: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'RoomModel',
    required: [true, 'Booking requires the ID for the room being booked.'],
  },
  uuid: {
    type: String,
    validate: {
      validator: (value) => uuidValidate(value) && uuidVersion(value) === 4,
      message: (props) => `${props.value} the UUID is either invalid or not version 4.`,
    },
    required: [true, 'Booking requires a UUID'],
  },
  totalPaid: {
    type: Number,
    required: [true, 'Booking requires total cost charged to customer'],
  },
  checkInDate: {
    type: Date,
    required: [true, 'Booking requires a check-in date.'],
  },
  checkOutDate: {
    type: Date,
    required: [true, 'Booking requires a check-out date.'],
  },
  checkInTime: String,
  checkOutTime: String,
  numAdults: {
    type: Number,
    required: [true, 'Booking requires a stated number of adult guests.'],
  },
  numChildren: {
    type: Number,
    required: [true, 'Booking requires a stated number of child guests.'],
  },
  comments: String,
});

export default mongoose.model('Bookings', bookingModel);
