import {Staff} from "../models/staff.js";

let newStaff = new Staff({
  username: "Chris",
  password: "Breanna",
})
let newStaffTwo = new Staff({
  username: "Admin1",
  password: "Password1",
})
let newStaffThree = new Staff({
  username: "Admin2",
  password: "Password2",
})

function saveStaff() {
  newStaff.save();
  newStaffTwo.save();
  newStaffThree.save();
}

export {saveStaff}
