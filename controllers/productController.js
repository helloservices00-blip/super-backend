const Product = require('../models/Product');
const { validationResult } = require('express-validator');

const createProduct = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  if (!req.user) return res.status(401).json({ message: 'Not authorized' });
  // vendor or admin can create, but vendor id used
  const vendorId = req.user.role === 'vendor' ? req.user._id : req.body.vendor;
  const { name, description, price, stock, category } = req.body;
  const product = await Product.create({ vendor: vendorId, name, description, price, stock, category });
  res.status(201).json(product);
};

const getProducts = async (req, res) => {
  const products = await Product.find().populate('vendor', 'shopName');
  res.json(products);
};

const updateProduct = async (req, res) => {
  const p = await Product.findById(req.params.id);
  if (!p) return res.status(404).json({ message: 'Product not found' });
  // only vendor owner or admin
  if (req.user.role === 'vendor' && p.vendor.toString() !== req.user._id.toString()) return res.status(403).json({ message: 'Not allowed' });
  Object.assign(p, req.body);
  await p.save();
  res.json(p);
};

const deleteProduct = async (req, res) => {
  const p = await Product.findById(req.params.id);
  if (!p) return res.status(404).json({ message: 'Product not found' });
  if (req.user.role === 'vendor' && p.vendor.toString() !== req.user._id.toString()) return res.status(403).json({ message: 'Not allowed' });
  await p.remove();
  res.json({ message: 'Product removed' });
};

module.exports = { createProduct, getProducts, updateProduct, deleteProduct };
