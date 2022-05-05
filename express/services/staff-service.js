import Staff from '../models/staff';

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

export default saveStaff;
