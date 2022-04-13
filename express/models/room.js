"use strict"
import mongoose from "mongoose";

const timeErr = "is not a valid time 'HH:MM'";

const RoomModel = new mongoose.Schema({
  type: String,
  description_short: String,
  description_full: String,
  max_adults: Number,
  max_children: Number,
  num_available: Number,
  minCheckIn: {
    type: String,
    validate: {
      validator: value => timeFormat(value),
      message: props => `${props.value} ${timeErr}`,
    },
    required: [true, 'The latest check-in time is required']
  },
  maxCheckIn: {
    type: String,
    validate: {
      validator: value => timeFormat(value),
      message: props => `${props.value} ${timeErr}`,
    },
    required: [true, 'The latest check-in time is required']
  },
  minCheckOut: {
    type: String,
    validate: {
      validator: value => timeFormat(value),
      message: props => `${props.value} ${timeErr}`
    },
    required: [true, 'The latest check-in time is required']
  },
  maxCheckOut: {
    type: String,
    validate: {
      validator: value => timeFormat(value),
      message: props => `${props.value} ${timeErr}`
    },
    required: [true, 'The latest check-in time is required']
  },
  checkInOutInterval: {
    type: Number,
    validate: {
      validator: value => intervalValidation(value),
      message: props => `${props.value} must be a number equal to or between 5 and 60`
    },
  },
  base_price: Number,
});

function intervalValidation(v) {
  return (v >= 5) && (v <= 60) &&  (v % 5 == 0);
}

function timeFormat(v) {
  return /^([0-1]\d|2[0-3]):([0-5]\d)$/.test(v);
}

export const Room = mongoose.model("RoomModel", RoomModel);

