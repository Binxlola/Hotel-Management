import express from "express";
import {login} from "../services/authentication-service.js";


// Create Router
const router = express.Router();

router.post("/login", async (req, res) => {
  //saveStaff();
  await login(req.body.username, req.body.password, req.body.isCustomer)
    .then(userData => res.status(201).json(userData))
    .catch(err => res.status(401).send(err));
})

export {router}
