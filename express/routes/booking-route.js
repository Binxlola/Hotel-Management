import express from "express";
import {saveRoom, getAllRooms} from "../services/booking-service.js";

// Create Router
const router = express.Router();

router.get("/room/save", (req, res) => {
  console.log("we got here");
  // saveRoom();
});

router.get("/rooms", (req, res) => {
  getAllRooms()
    .then(rooms => res.json(rooms))
    .catch(err => res.status(404).json({error: "There was an error retrieving rooms"}));
});

export {router}
