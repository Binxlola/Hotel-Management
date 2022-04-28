import {Room} from "../models/room.js";
import mongoose from "mongoose";
import {v4 as uuidv4} from "uuid";
import {Booking} from "../models/booking.js";

const r1 = new Room({
  type: "Single Room",
  description_short: "For the solo wanderer",
  description_full: "The perfect option for those travelers who'd prefer a simple place to stay, so they can hold on to more money to better enjoy their trip. If you feel the need to do some work there is a desk and chair in each room.",
  max_adults: 1,
  max_children: 1,
  num_available: 10,
  minCheckIn: "09:00",
  maxCheckIn: "11:00",
  minCheckOut: "10:00",
  maxCheckOut: "12:00",
  checkInOutInterval: 30,
  base_price: 50,
});

const r2 = new Room({
  type: "Double Room",
  description_short: "For a sweet couple",
  description_full: "The perfect option for those travelers who'd prefer a simple place to stay, so they can hold on to more money to better enjoy their trip. If you feel the need to do some work there is a desk and chair in each room.",
  max_adults: 2,
  max_children: 1,
  num_available: 10,
  minCheckIn: "09:00",
  maxCheckIn: "11:00",
  minCheckOut: "10:00",
  maxCheckOut: "12:00",
  checkInOutInterval: 30,
  base_price: 60,
});

const r3 = new Room({
  type: "Deluxe Double Room",
  description_short: "The honeymoon favourite",
  description_full: "The perfect option for those travelers who'd prefer a simple place to stay, so they can hold on to more money to better enjoy their trip. If you feel the need to do some work there is a desk and chair in each room.",
  max_adults: 2,
  max_children: 2,
  num_available: 10,
  minCheckIn: "09:00",
  maxCheckIn: "11:00",
  minCheckOut: "10:00",
  maxCheckOut: "12:00",
  checkInOutInterval: 30,
  base_price: 80,
});

function saveRoom() {
  r1.save().then(r => console.log(r));
  r2.save().then(r => console.log(r));
  r3.save().then(r => console.log(r));
}

/**
 * Create new mongoose booking object and save to collection.
 * @param booking A request body containing the booking information
 * @returns {*} The saved booking
 */
function saveBooking(booking) {
  return new Booking({
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
    comments: booking.comments
  }).save();
}

function getAllRooms() {
  return Room.find();
}

function getAllBookings() {
  return Booking.find();
}

export {saveRoom, getAllRooms, saveBooking, getAllBookings}
