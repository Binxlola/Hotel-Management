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

async function findStaff(staff){
  let returnedData = {
    error: null,
    user: null
  }

  // **CB Seeing if staff username and password exists in query
  let user = await Staff.findOne({username: staff.username});
  console.log(user);

  if(!user){
    returnedData.error = "Username does not exist";
  } else if(user.password !== staff.password){
    returnedData.error = "Password does not match";
  } else{
    returnedData.user = user;
  }

  return returnedData;
}

export {saveStaff, findStaff}
