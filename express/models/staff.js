"use strict"
import mongoose from "mongoose";

const StaffModel = new mongoose.Schema({
  username: String,
  password: String
});

export const Staff = mongoose.model("staffModel", StaffModel);

