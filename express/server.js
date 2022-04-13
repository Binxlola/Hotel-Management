"use strict"
import express from "express"
import cors from "cors"
import bodyParser from "body-parser";
import mongoose from "mongoose"

// Import routers
import {router as authenticationRouter} from "./routes/authentication-route.js";
import {router as bookingRouter} from "./routes/booking-route.js"
import path from "path";
import {fileURLToPath} from "url";

// Create app and set distribution path
const __filename = fileURLToPath(import.meta.url);
const distDir = path.dirname(__filename) + "/dist/";
const app = express();

// Config server
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(distDir));

// Add server routes
app.use("/authenticate", authenticationRouter);
app.use("/booking", bookingRouter);

// Make connection to DB
mongoose.connect("mongodb+srv://admin:admin@cluster0.wnjia.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Confirm db connection and store
const db = mongoose.connection;
db.on("error", console.error.bind(console, "Database connection error: "));
db.once("open", () => {
  console.log("Database connection was successful!");
});

// Init server
const server = app.listen(process.env.PORT || 8080, () => {
  let port = server.address().port;
  console.log("App now running on port", port);
});

app.get("/api/status", (req, res) => {
  res.status(200).json({status: "UP"});
});

