import jwt from 'jsonwebtoken';
import * as uuid from 'uuid';
import Staff from '../models/staff.js';
import Customer from '../models/customer.js';
import PasswordResetModel from '../models/reset-id.js';
import { sendPasswordReset } from './utility-service.js';

async function serviceInit() {
  const defaultAdminStruct = {
    username: 'admin',
    password: 'admin',
    firstName: 'admin',
    lastName: 'admin',
    email: 'admin@text.com',
    mobile: '123456789',
    taxCode: 'X',
    role: 'admin',
  };
  const defaultAdmin = await Staff.findOne(defaultAdminStruct);

  if (defaultAdmin) throw 'Default superuser already created once';
  return new Staff(defaultAdminStruct).save();
}

/**
 * Generates a unique JSON web token to be set against a user
 * who intends to log in and use the API service
 * @param username The username of the user intending to log in
 * @param id The primary key (id) for the user intending to log in
 * @returns {*} A unique JSON web token
 */
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

  return {
    jwt: {
      token: getToken(user.username, user._id),
      expiresIn: 3600,
    },
    _id: user._id,
    role: isCustomer ? undefined : user.role,
  };
}

//
async function resetPassword(body) {
  let filter;
  let user;
  if (body.isNewReset) {
    filter = { username: body.value };
    user = await Customer.findOne(filter);
    if (!user) throw 'The username does not exist!';

    const UUID = uuid.v4();
    await new PasswordResetModel({
      UUID,
      username: body.value,
      email: user.email,
    }).save();
    try {
      sendPasswordReset(user.email, UUID);
    } catch (e) {
      console.log(e);
    }
  } else {
    filter = { UUID: body.resetID };
    const passwordReset = await PasswordResetModel.findOne(filter);
    await Customer.findOneAndUpdate({ email: passwordReset.email }, { password: body.value });
    await PasswordResetModel.findByIdAndDelete(passwordReset._id);
  }
}
export {
  login, getToken, resetPassword, serviceInit,
};
