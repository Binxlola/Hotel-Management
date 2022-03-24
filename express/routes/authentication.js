import express from "express";
import {saveCustomer} from "../services/customers.js";

// Create Router
const router = express.Router();

router.get("/login", (req, res) => {
  saveCustomer()
    .then(customer => {
      res.status(200).json({status: "saved"});
    }).catch(err => {
    res.status(500).json({status: "error"});
  })
})

export {router}
