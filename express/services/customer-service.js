import {Customer} from "../models/customer.js";
import {Staff} from "../models/staff.js";

let newCustomer = new Customer({
  username: "Jason01",
  password: "test",
  first_name: "Jason",
  last_name: "Smit",
  email: "qnf1170@autuni.ac.nz",
})

function saveCustomer() {
  return newCustomer.save();
}

async function findCustomer(customer){

  let returnedData = {
    error: null,
    user: null
  }

  let user = await Customer.findOne({username: customer.username});

  if(!user){
    returnedData.error = "Username does not exist";
  } else if(user.password !== customer.password){
    returnedData.error = "Password does not match";
  } else{
    returnedData.user = user;
  }

  return returnedData;
}

export {saveCustomer, findCustomer}
