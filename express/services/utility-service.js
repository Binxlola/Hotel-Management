import nodemailer from 'nodemailer';
import config from '../config.js';

/**
 * This is sending information to a users email from the master email.
 * @param userMail this takes in user email.
 * @param bookingReference this takes the reference code generated from booking.
 */
function sendBookingConfirmation(userMail, bookingReference) {
  const transporter = nodemailer.createTransport(config.emails.bookingEmail);
  const mailOptions = {
    from: config.emails.bookingEmail.auth.user,
    to: userMail,
    subject: 'Booking Confirmation',
    text: `Your booking was successfully completed, ref: ${bookingReference}`,
  };

  transporter.sendMail(mailOptions, (error) => {
    if (error) console.log(error);
    else console.log('Email sent');
  });
}

function sendBookingCancellation(userMail, bookingReference) {
  const transporter = nodemailer.createTransport(config.emails.bookingEmail);
  const mailOptions = {
    from: config.emails.bookingEmail.auth.user,
    to: userMail,
    subject: 'Booking Cancellation',
    text: `Your booking was successfully canceled, ref: ${bookingReference}`,
  };

  transporter.sendMail(mailOptions, (error) => {
    if (error) console.log(error);
    else console.log('Email sent');
  });
}

function sendPasswordReset(userMail, uuid) {
  const transporter = nodemailer.createTransport(config.emails.bookingEmail);
  const mailOptions = {
    from: config.emails.bookingEmail.auth.user,
    to: userMail,
    subject: 'Reset-Password',
    text: `Press link to reset password, LINK HERE: ${new URL("http://localhost:4200/reset-password/" + uuid)}`
  };

  transporter.sendMail(mailOptions, (error) => {
    if (error) console.log(error);
    else console.log('Email sent');
  });
}
export { sendBookingConfirmation, sendBookingCancellation, sendPasswordReset };
