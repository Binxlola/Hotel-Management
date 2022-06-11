import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

// Import routers
import path from 'path';
import { fileURLToPath } from 'url';
import authenticationRouter from './routes/authentication-route.js';
import bookingRouter from './routes/booking-route.js';
import customerRouter from './routes/customer-route.js';
import staffRouter from './routes/staff-route.js';

// Create app and set distribution path
const __filename = fileURLToPath(import.meta.url);
const distDir = `${path.dirname(__filename)}/dist/`;
const app = express();

// Config server
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(distDir));

// Add server routes
app.use('/authentication', authenticationRouter);
app.use('/booking', bookingRouter);
app.use('/staff', staffRouter);
app.use('/customer', customerRouter);

// Make connection to DB
mongoose.connect('mongodb+srv://admin:admin@cluster0.wnjia.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Confirm db connection and store
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Database connection error: '));
db.once('open', () => {
  console.log('Database connection was successful!');
});

// Init server
const server = app.listen(process.env.PORT || 8080, () => {
  const { port } = server.address();
  console.log('App now running on port', port);
});


