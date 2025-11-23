const Order = require('../models/Order');
const Product = require('../models/Product');

const createOrder = async (req, res) => {
  if (!req.user) return res.status(401).json({ message: 'Not authorized' });
  const { vendor, products } = req.body; // products: [{product, quantity}]
  let totalPrice = 0;
  for (const item of products) {
    const prod = await Product.findById(item.product);
    if (!prod) return res.status(404).json({ message: 'Product not found' });
    totalPrice += prod.price * (item.quantity || 1);
  }
  const order = await Order.create({ customer: req.user._id, vendor, products, totalPrice });
  res.status(201).json(order);
};

const getOrders = async (req, res) => {
  if (!req.user) return res.status(401).json({ message: 'Not authorized' });
  if (req.user.role === 'customer') {
    const orders = await Order.find({ customer: req.user._id }).populate('products.product vendor', 'name shopName');
    return res.json(orders);
  } else if (req.user.role === 'vendor') {
    const orders = await Order.find({ vendor: req.user._id }).populate('products.product customer', 'name email');
    return res.json(orders);
  } else {
    // admin
    const orders = await Order.find().populate('products.product vendor customer', 'name shopName email');
    return res.json(orders);
  }
};

const updateStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const order = await Order.findById(id);
  if (!order) return res.status(404).json({ message: 'Not found' });
  if (req.user.role === 'vendor' && order.vendor.toString() !== req.user._id.toString()) return res.status(403).json({ message: 'Not allowed' });
  order.status = status;
  await order.save();
  res.json(order);
};

module.exports = { createOrder, getOrders, updateStatus };
