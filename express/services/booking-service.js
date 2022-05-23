import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import Room from '../models/room.js';
import Booking from '../models/booking.js';
import {sendBookingCancellation, sendBookingConfirmation} from './utility-service.js';
import Customer from '../models/customer.js';

async function saveRoom(room) {
  const newRoom = await new Room({
    type: room.type,
    num_available: room.num_available,
    description_short: room.description_short,
    description_full: room.description_full,
    max_adults: room.max_adults,
    max_children: room.max_children,
    minCheckIn: room.minCheckIn,
    maxCheckIn: room.maxCheckIn,
    minCheckOut: room.minCheckOut,
    maxCheckOut: room.maxCheckOut,
    checkInOutInterval: room.checkInOutInterval,
    base_price: room.base_price,
  }).save();

  return newRoom != null;
}

async function updateRoom(room) {
  const filter = { _id: mongoose.Types.ObjectId(room._id) };
  const updatedRoom = await Room.findOneAndUpdate(
    filter,
    {
      num_available: room.num_available,
      description_short: room.description_short,
      description_full: room.description_full,
      minCheckIn: room.minCheckIn,
      maxCheckIn: room.maxCheckIn,
      minCheckOut: room.minCheckOut,
      maxCheckOut: room.maxCheckOut,
      checkInOutInterval: room.checkInOutInterval,
      base_price: room.base_price,
    },
  );

  return updatedRoom != null;
}

async function deleteRoom(room) {
  const deletedRoom = await Room.findByIdAndDelete(mongoose.Types.ObjectId(room._id));

  return deletedRoom != null;
}

async function cancelBooking(booking) {
  const canceledBooking = await Booking.findByIdAndDelete(mongoose.Types.ObjectId(booking._id));

  if (canceledBooking) {
    const user = Customer.findById(canceledBooking.user);
    sendBookingCancellation(user.email, canceledBooking.uuid);
  }

  return canceledBooking != null;
}

/**
 * Create new mongoose booking object and save to collection.
 * @param booking A request body containing the booking information
 * @returns {*} The saved booking
 */
async function saveBooking(booking) {
  const newBooking = await new Booking({
    user: mongoose.Types.ObjectId(booking.user),
    bookingName: booking.bookingName,
    room: mongoose.Types.ObjectId(booking.room),
    uuid: uuidv4(),
    totalPaid: booking.totalPaid,
    checkInDate: Date.parse(booking.checkInDate),
    checkOutDate: Date.parse(booking.checkOutDate),
    checkInTime: booking.checkInTime,
    checkOutTime: booking.checkOutTime,
    numAdults: booking.numAdults,
    numChildren: booking.numChildren,
    comments: booking.comments,
  }).save();

  if (newBooking) {
    try {
      const user = await Customer.findById(booking.user);
      sendBookingConfirmation(user.email, newBooking.uuid);
    } catch (e) {
      console.log(e);
    }
  }

  return newBooking;
}

function getAllRooms() {
  return Room.find();
}

function getAllBookings() {
  return Booking.find();
}

export {
  saveRoom, updateRoom, deleteRoom, getAllRooms, saveBooking, getAllBookings, cancelBooking,
};
