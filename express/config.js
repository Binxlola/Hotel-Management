"use strict"
const config = {
  emails: {
    bookingEmail: {
      service: "outlook",
      auth: {
        user: "aut.hotel.bookings@outlook.com",
        pass: "#Jason01#"
      }
    }
  },
  db: {
    host: 'localhost',
    port: 27017,
    name: 'db'
  }
};

export const emails = config.emails;
