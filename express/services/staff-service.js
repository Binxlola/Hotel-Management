import Staff from '../models/staff.js';
import BillableCategory from '../models/billable-category.js';
import Billable from '../models/billable.js';

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

function deleteBillable(id) {
  return Billable.findByIdAndDelete(id);
}

async function deleteBillableGroup(group) {
  // remove all the billable items first
  for (const item of group.items) {
    await Billable.findByIdAndDelete(item._id);
  }

  // Finally, we remove the category
  return BillableCategory.findByIdAndDelete(group.category._id);
}

function saveOrUpdateStaff(staffData) {
  const document = {
    username: staffData.staff.username,
    password: staffData.staff.password,
    firstName: staffData.staff.firstName,
    lastName: staffData.staff.lastName,
    email: staffData.staff.email,
    mobile: staffData.staff.mobile,
    taxCode: staffData.staff.taxCode,
    role: staffData.staff.role,
  };

  // If new staff is being created
  if (staffData.staffID === undefined || staffData.staffID === '') {
    const staffModel = new Staff(document);
    return staffModel.save();
  }

  return Staff.findByIdAndUpdate(staffData.staffID, document);
}

/**
 * Will retrieve all billable items, condensed into their respective categories
 * using a Billable Group object
 * @returns {Promise<unknown[]>}
 */
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

async function getStaff() {
  return Staff.find();
}

/**
 * Query the staff model schema for all available roles for staff members
 * @returns {*} An array of staff roles
 */
async function getStaffRolesList() {
  return Staff.schema.path('role').enumValues;
}

export {
  saveBillableCategory, getAllBillableCategories, saveBillable, getAllBillableGroups,
  deleteBillable, deleteBillableGroup, getStaffRolesList, saveOrUpdateStaff, getStaff,
};
