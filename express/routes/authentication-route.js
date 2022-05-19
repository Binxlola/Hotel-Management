import express from 'express';
import { login } from '../services/authentication-service.js';
import {resetPassword, signup} from '../services/customer-service.js';
import saveStaff from '../services/staff-service.js';

// Create Router
const router = express.Router();

router.post('/login', async (req, res) => {
  const { body } = req;
  await login(body.username, body.password, body.isCustomer)
    .then((userData) => res.status(201).json(userData))
    .catch((err) => res.status(401).send(err));
});
// can user this for booking component direct to new page
router.post('/passwordreset', async (req, res) => {
  const { body } = req;
  try {
    await resetPassword(body.username);
    res.sendStatus(200);
  }
  catch(error){
    res.json({error : "error with input"});
    console.log(error)
  }
});

//promise chaining with then and catch
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
