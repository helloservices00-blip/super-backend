const Vendor = require('../models/Vendor');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

const generateToken = (id, role) => jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: '30d' });

const registerVendor = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  const { name, email, password, shopName } = req.body;
  const exists = await Vendor.findOne({ email });
  if (exists) return res.status(400).json({ message: 'Vendor exists' });
  const vendor = await Vendor.create({ name, email, password, shopName });
  res.status(201).json({ _id: vendor._id, name: vendor.name, email: vendor.email, shopName: vendor.shopName, role: vendor.role, token: generateToken(vendor._id, vendor.role) });
};

const loginVendor = async (req, res) => {
  const { email, password } = req.body;
  const vendor = await Vendor.findOne({ email });
  if (vendor && (await vendor.matchPassword(password))) {
    res.json({ _id: vendor._id, name: vendor.name, email: vendor.email, shopName: vendor.shopName, role: vendor.role, token: generateToken(vendor._id, vendor.role) });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
};

const listVendors = async (req, res) => {
  const vendors = await Vendor.find().select('-password');
  res.json(vendors);
};

module.exports = { registerVendor, loginVendor, listVendors };
