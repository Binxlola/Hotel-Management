import nodemailer from 'nodemailer';
import emails from '../config';

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

export { sendBookingConfirmation, sendBookingCancellation };
