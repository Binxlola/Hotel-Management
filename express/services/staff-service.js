import Staff from '../models/staff.js';
import BillableCategory from '../models/billable-category.js';

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

export { saveStaff, saveBillableCategory, getAllBillableCategories };
