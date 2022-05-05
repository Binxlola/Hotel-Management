import jwt from 'jsonwebtoken';
import Staff from '../models/staff';
import Customer from '../models/customer';

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

export { login, getToken };
