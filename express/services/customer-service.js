import {Customer} from "../models/customer.js";

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

export {saveCustomer}
