import express from "express";
import {
  saveRoom,
  getAllRooms,
  saveBooking,
  getAllBookings,
  updateRoom,
  deleteRoom
} from "../services/booking-service.js";

// Create Router
const router = express.Router();

router.post("/save-room", async (req, res) => {
  await saveRoom(req.body)
    .then(isSaved => res.status(201).json(isSaved))
    .catch(err => {
      console.log(err);
      res.status(500).json({
        message: "There was an error saving booking",
        err: err
      })
    });
});

router.post("/update-room", async (req, res) => {
  await updateRoom(req.body)
    .then(isUpdated => res.status(201).json(isUpdated))
    .catch(err => {
      console.log(err);
      res.status(500).json({
        message: "There was an error updating room",
        err: err
      })
    });
});

router.post("/delete-room", async (req, res) => {
  await deleteRoom(req.body)
    .then(isDeleted => res.status(201).json(isDeleted))
    .catch(err => {
      console.log(err);
      res.status(500).json({
        message: "There was an error deleting room",
        err: err
      })
    });
});

router.get("/all-rooms", (req, res) => {
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
