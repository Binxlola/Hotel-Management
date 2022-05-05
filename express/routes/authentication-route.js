import express from 'express';
import { login } from '../services/authentication-service.js';
import signup from '../services/customer-service.js';
import saveStaff from '../services/staff-service.js';

// Create Router
const router = express.Router();

router.post('/login', async (req, res) => {
  const { body } = req;
  await login(body.username, body.password, body.isCustomer)
    .then((userData) => res.status(201).json(userData))
    .catch((err) => res.status(401).send(err));
});

router.post('/signup', async (req, res) => {
  const { body } = req;
  await signup(body.username, body.password, body.firstName, body.lastName, body.email)
    .then((userData) => res.status(201).json(userData))
    .catch((err) => res.status(401).send(err));
});

router.get('/saveStaff', async () => {
  saveStaff();
});

// CB -- here//

export default router;
