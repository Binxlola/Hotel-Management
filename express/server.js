"use strict"
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const distDir = __dirname + "/dist/";
const app = express();

// Config server by setting default parser and creating a link to Angular build directory and enabling cors
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(distDir));

// Init server
let server = app.listen(process.env.PORT || 8080, () => {
  let port = server.address().port;
  console.log("App now running on port", port);
})

app.get("/api/status", (req, res) => {
  res.status(200).json({status: "UP"});
});

