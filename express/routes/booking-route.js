import express from "express";
import {saveRoom, getAllRooms, saveBooking, getAllBookings} from "../services/booking-service.js";

// Create Router
const router = express.Router();

router.get("/room/save", (req, res) => {
  console.log("we got here");
  // saveRoom();
});

router.get("/all-room", (req, res) => {
  getAllRooms()
    .then(rooms => res.json(rooms))
    .catch(err => res.status(404).json({error: "There was an error retrieving rooms"}));
});

router.get("/all-bookings", (req, res) => {
  getAllBookings()
    .then(bookings => res.json(bookings))
    .catch(err => res.status(404).json({error: "There was an error retrieving bookings"}));
});

router.post("/save-booking", async (req, res) => {
  await saveBooking(req.body)
    .then(booking => res.status(201).json(booking))
    .catch(err => res.status(500).json({
      message: "There was an error saving booking",
      err: err
    }));
});

export {router}
