import express from 'express';
import {
  deleteBillable, deleteBillableGroup,
  getAllBillableCategories,
  getAllBillableGroups, getStaff, getStaffRolesList,
  saveBillable,
  saveBillableCategory, saveOrUpdateStaff,
} from '../services/staff-service.js';
import {getCustomers} from "../services/customer-service.js";

// Create Router
const router = express.Router();

router.get('/all-billable-groups', (req, res) => {
  getAllBillableGroups()
    .then((billableGroups) => res.json(billableGroups))
    .catch(() => res.status(404).json({ error: 'There was an error retrieving billable groups' }));
});

router.get('/all-billable-categories', (req, res) => {
  getAllBillableCategories()
    .then((categories) => res.json(categories))
    .catch(() => res.status(404).json({ error: 'There was an error retrieving billable categories' }));
});

router.post('/save-billable-category', (req, res) => {
  saveBillableCategory(req.body)
    .then((category) => res.json(category))
    .catch(() => res.status(500).json({ error: 'There was an error saving new billable category' }));
});

router.post('/save-billable', (req, res) => {
  saveBillable(req.body)
    .then((billable) => res.json(billable))
    .catch(() => res.status(500).json({ error: 'There was an error saving new billable' }));
});

router.post('/delete-billable', (req, res) => {
  deleteBillable(req.body.id)
    .then((response) => res.json(response))
    .catch(() => res.status(500).json({ error: 'There was an error deleting billable' }));
});

router.post('/delete-billable-group', (req, res) => {
  deleteBillableGroup(req.body)
    .then((response) => res.json(response))
    .catch(() => res.status(500).json({ error: 'There was an error deleting billable group and it\'s items' }));
});

router.get('/all-staff-roles', (req, res) => {
  getStaffRolesList()
    .then((roles) => res.json(roles))
    .catch(() => res.status(404).json({ error: 'There was an error retrieving the array of staff roles' }));
});

router.get('/all-staff', (req, res) => {
  getStaff()
    .then((staff) => res.json(staff))
    .catch(() => res.status(404).json({ error: 'There was an error retrieving staff' }));
});

router.post('/save-update-staff', (req, res) => {
  saveOrUpdateStaff(req.body)
    .then((response) => res.json(response))
    .catch(() => res.status(500).json({ error: 'There was an error saving or updating the staff member' }));
});

export default router;
