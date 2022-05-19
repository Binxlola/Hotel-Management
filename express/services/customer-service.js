import Customer from '../models/customer.js';
import { getToken } from './authentication-service.js';
import Staff from "../models/staff.js";
import * as uuid from "uuid";
import UserUUIDModel from "../models/reset-id.js";
import {sendBookingCancellation, sendUuidEmail} from "./utility-service.js";

/**
 * This function checks if the user is a customer, then will compare against the correct database
 * Username and email will be checked,If there is no match, then proceed to store data
 * into database and enter dashboard
 * else if there is a match for anyone of them, error occurs, fails to store to database
 * @param username
 * @param password
 * @param firstName
 * @param lastName
 * @param email
 * @returns {Promise<{jwt: {expiresIn: number, token: (*)}, _id}>}
 */
async function signup(username, password, firstName, lastName, email) {
  const filter = { username };
  let user = await Customer.findOne(filter);

  if (user) throw 'This username already exists';
  else if (user != null && user.email === email) throw 'This email already exists';
  else {
    user = await new Customer({
      username: username,
      password: password,
      first_name: firstName,
      last_name: lastName,
      email: email,
    }).save();
  }

  return {
    jwt: {
      token: getToken(user.username, user._id),
      expiresIn: 3600,
    },
    _id: user._id,
  };
}


async function resetPassword(username) {
  const filter = { username };
  let user = await Customer.findOne(filter).exec();

  console.log("made it before if");

  //guard condition
  if (!user) throw 'The username does not exist!';

    console.log("made it to else");
  //create UUID and store it into our reset-id model
    const UUID = uuid.v4();
    await new UserUUIDModel({
      UUID: UUID,
      username: username,
      email: user.email,
    }).save();
    sendUuidEmail(user.email, UUID);

    //end point to invoke method
}


async function getCustomers() {
  const fieldSelection = [
    'username',
    'first_name',
    'last_name',
    'email',
    'last_logon',
    'registration_date',
  ];

  return Customer.find({}, fieldSelection);
}

export { signup, getCustomers, resetPassword };
