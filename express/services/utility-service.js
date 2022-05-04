import nodemailer from "nodemailer"
import {emails} from "../config.js"

function sendBookingConfirmation(userMail, bookingReference) {
  const transporter = nodemailer.createTransport(emails.bookingEmail)
  const mailOptions = {
    from: emails.bookingEmail.auth.user,
    to: userMail,
    subject: "Booking Confirmation",
    text: `Your booking was successfully completed, ref: ${bookingReference}`
  }

  transporter.sendMail(mailOptions, (error, info) => {
    if(error) console.log(error);
    else console.log("Email sent");
  })
}

export {sendBookingConfirmation}
