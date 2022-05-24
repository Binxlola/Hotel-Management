import jwt from 'jsonwebtoken';
import Staff from '../models/staff.js';
import Customer from '../models/customer.js';
import * as uuid from "uuid";
import PasswordResetModel from "../models/reset-id.js";
import {sendPasswordReset} from "./utility-service.js";

function getToken(username, id) {
  return jwt.sign(
    {
      username,
      id,
    },
    'ourSecret',
    {
      expiresIn: '1h',
    },
  );
}


/**
 * This function checks if the user is a staff, then will compare against the correct database
 * username and password will be checked, if there is a match, then proceed to login
 * else if there is no match, proceed to error codes.
 * @param username
 * @param password
 * @param isCustomer
 * @returns {Promise<{jwt: {expiresIn: number, token: (*)}, _id: *}>}
 */
async function login(username, password, isCustomer) {
  const filter = { username };
  const user = isCustomer ? await Customer.findOne(filter) : await Staff.findOne(filter);

  if (!user) throw 'The username does not exist!';
  else if (user.password !== password) throw 'Incorrect password';

  // Should only be reached if no errors were thrown
  return {
    jwt: {
      token: getToken(user.username, user._id),
      expiresIn: 3600,
    },
    _id: user._id,
  };
}

async function resetPassword(body) {
  const filter = { username: body.username };
  let user = await Customer.findOne(filter);

  //guard condition
  if (!user) throw 'The username does not exist!';
  //create UUID and store it into our reset-id model
  const UUID = uuid.v4();
  await new PasswordResetModel({
    UUID: UUID,
    username: body.username,
    email: user.email,
  }).save();
  try {
    sendPasswordReset(user.email, UUID);
  }
  catch(e){
    console.log(e);
  }
  //end point to invoke method
}
export { login, getToken, resetPassword };
