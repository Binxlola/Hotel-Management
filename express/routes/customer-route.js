import express from 'express';
import { getCustomers } from '../services/customer-service.js';

// Create Router
const router = express.Router();

router.get('/all-customers', (req, res) => {
  getCustomers()
    .then((customers) => res.json(customers))
    .catch(() => res.status(404).json({ error: 'There was an error retrieving customers' }));
});

export default router;
