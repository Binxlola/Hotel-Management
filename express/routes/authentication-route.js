import express from 'express';
import { login, resetPassword, serviceInit } from '../services/authentication-service.js';
import { signup } from '../services/customer-service.js';

// Create Router
const router = express.Router();

router.post('/login', async (req, res) => {
  const { body } = req;
  await login(body.username, body.password, body.isCustomer)
    .then((userData) => res.status(201).json(userData))
    .catch((err) => res.status(401).send(err));
});
// can user this for booking component direct to new page
router.post('/password-reset', async (req, res) => {
  try {
    await resetPassword(req.body);
    res.sendStatus(200);
  } catch (error) {
    res.json({ error: 'error with input' });
    console.log(error);
  }
});

// promise chaining with then and catch
router.post('/signup', async (req, res) => {
  const { body } = req;
  await signup(body.username, body.password, body.firstName, body.lastName, body.email)
    .then((userData) => res.status(201).json(userData))
    .catch((err) => res.status(401).send(err));
});

/**
 * User to create a default superuser for the web application and
 * the backend service on initial start-up.
 * This route should only have an affect once,
 * when no default superuser exists and there is currently no data in the system.
 */
router.get('/setup-superuser', (req, res) => {
  serviceInit()
    .then(() => res.status(201).send('Default superuser created'))
    .catch((err) => res.status(401).send(err));
});

export default router;
