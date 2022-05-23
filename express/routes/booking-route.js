import express from 'express';
import {
  saveRoom,
  getAllRooms,
  saveBooking,
  getAllBookings,
  updateRoom,
  deleteRoom, cancelBooking,
} from '../services/booking-service.js';
import {getAllBillableCategories, saveBillableCategory} from "../services/staff-service.js";

// Create Router
const router = express.Router();

router.post('/save-room', async (req, res) => {
  await saveRoom(req.body)
    .then((isSaved) => res.status(201).json(isSaved))
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        message: 'There was an error saving booking',
        err,
      });
    });
});

router.post('/update-room', async (req, res) => {
  await updateRoom(req.body)
    .then((isUpdated) => res.status(201).json(isUpdated))
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        message: 'There was an error updating room',
        err,
      });
    });
});

router.post('/delete-room', async (req, res) => {
  await deleteRoom(req.body)
    .then((isDeleted) => res.status(201).json(isDeleted))
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        message: 'There was an error deleting room',
        err,
      });
    });
});

router.get('/all-rooms', (req, res) => {
  getAllRooms()
    .then((rooms) => res.json(rooms))
    .catch(() => res.status(404).json({ error: 'There was an error retrieving rooms' }));
});

router.post('/save-booking', async (req, res) => {
  await saveBooking(req.body)
    .then((booking) => res.status(201).json(booking))
    .catch((err) => res.status(500).json({
      message: 'There was an error saving booking',
      err,
    }));
});

router.post('/cancel-booking', async (req, res) => {
  await cancelBooking(req.body)
    .then((isCanceled) => res.status(201).json(isCanceled))
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        message: 'There was an error deleting room',
        err,
      });
    });
});

router.get('/all-bookings', (req, res) => {
  getAllBookings()
    .then((bookings) => res.json(bookings))
    .catch(() => res.status(404).json({ error: 'There was an error retrieving bookings' }));
});

router.get('/all-billable-categories', (req, res) => {
  getAllBillableCategories()
    .then((categories) => res.json(categories))
    .catch(() => res.status(404).json({ error: 'There was an error retrieving billable categories' }));
});

router.post('/save-billable-category', (req, res) => {
  saveBillableCategory(req.body)
    .then((category) => res.json(category))
    .catch(() => res.status(500).json({ error: 'There was an error saving new billable category' }));
});

export default router;
