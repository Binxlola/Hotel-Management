import express from "express";
import {findCustomer, saveCustomer} from "../services/customer-service.js";
import {findStaff, saveStaff} from "../services/staff-service.js";
//import {findCustomer} from "../services/customer-service.js";


// Create Router
const router = express.Router();

router.post("/login", async (req, res) => {
  //saveStaff();
  let data = req.body.isStaff ? await findStaff(req.body) : await findCustomer(req.body);
  res.status(data.user ? 200 : 401).json(data);
})

export {router}
