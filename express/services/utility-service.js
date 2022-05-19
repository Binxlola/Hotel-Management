import nodemailer from 'nodemailer';
import emails from '../config.js';

/**
 * This is sending information to a users email from the master email.
 * @param userMail this takes in user email.
 * @param bookingReference this takes the reference code generated from booking.
 */
function sendBookingConfirmation(userMail, bookingReference) {
  const transporter = nodemailer.createTransport(emails.bookingEmail);
  const mailOptions = {
    from: emails.bookingEmail.auth.user,
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
  const transporter = nodemailer.createTransport(emails.bookingEmail);
  const mailOptions = {
    from: emails.bookingEmail.auth.user,
    to: userMail,
    subject: 'Booking Cancellation',
    text: `Your booking was successfully canceled, ref: ${bookingReference}`,
  };

  transporter.sendMail(mailOptions, (error) => {
    if (error) console.log(error);
    else console.log('Email sent');
  });
}

function sendUuidEmail(userMail, uuid) {
  const transporter = nodemailer.createTransport(emails.userEmail);
  const mailOptions = {
    from: emails.userEmail.auth.user,
    to: userMail,
    subject: 'Reset-Password',
    text: `Press link to reset password, LINK HERE: http://localhost:4200/password/reset/`+ 'UUID'
  };
}
export { sendBookingConfirmation, sendBookingCancellation, sendUuidEmail };
