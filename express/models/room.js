"use strict"
import mongoose from "mongoose";

const RoomModel = new mongoose.Schema({
  type: String,
  description_short: String,
  description_full: String,
  max_adults: Number,
  max_children: Number,
  num_available: Number,
  base_price: Number,
});

export const Room = mongoose.model("RoomModel", RoomModel);

