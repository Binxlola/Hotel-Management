import Customer from '../models/customer';
import { getToken } from './authentication-service';

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
      username,
      password,
      first_name: firstName,
      last_name: lastName,
      email,
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

export default signup;
