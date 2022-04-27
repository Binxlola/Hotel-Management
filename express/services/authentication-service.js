import jwt from "jsonwebtoken";
import {Staff} from "../models/staff.js";
import {Customer} from "../models/customer.js";
import {throwError} from "rxjs";

async function login(username, password, isCustomer) {
  const filter = {username: username};
  let user = isCustomer ? await Customer.findOne(filter) : await Staff.findOne(filter);

  if(!user) throw "The username does not exist!";
  else if(user.password !== password) throw "Incorrect password";

  // Should only be reached if no errors were thrown
  return {
      jwt: {
        token: getToken(user.username, user._id),
        expiresIn: 3600
      },
      _id: user._id
    }
}

function getToken(username, id) {
  return jwt.sign(
    {
      username: username,
      id: id
    },
    "ourSecret",
    {
      expiresIn: "1h"
    })
}

export {login}
