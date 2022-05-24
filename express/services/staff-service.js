import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import Staff from '../models/staff.js';
import BillableCategory from '../models/billable-category.js';
import Booking from '../models/booking.js';
import Billable from '../models/billable.js';

const newStaff = new Staff({
  username: 'Chris',
  password: 'Breanna',
});
const newStaffTwo = new Staff({
  username: 'Admin1',
  password: 'Password1',
});
const newStaffThree = new Staff({
  username: 'Admin2',
  password: 'Password2',
});

function saveStaff() {
  newStaff.save();
  newStaffTwo.save();
  newStaffThree.save();
}

function getAllBillableCategories() {
  return BillableCategory.find();
}

function saveBillableCategory(categoryObject) {
  return new BillableCategory({
    name: categoryObject.categoryName,
  }).save();
}

function saveBillable(billable) {
  return new Billable({
    category: billable.category,
    name: billable.name,
    cost: billable.cost,
  }).save();
}

async function getAllBillableGroups() {
  const result = {};
  const billableCategories = await BillableCategory.find();
  const billableItems = await Billable.find();

  // Build result structure
  billableCategories.forEach((category) => {
    result[category._id.toString()] = {
      category,
      items: [],
    };
  });

  // Fill each group with billable items
  billableItems.forEach((item) => {
    result[item.category.toString()].items.push(item);
  });

  return Object.values(result);
}

export {
  saveStaff, saveBillableCategory, getAllBillableCategories, saveBillable,
  getAllBillableGroups,
};
