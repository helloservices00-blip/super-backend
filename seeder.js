// Simple seeder to create an admin user and sample vendor + product
const mongoose = require('mongoose');
require('dotenv').config();
const connectDB = require('./config/db');
const User = require('./models/User');
const Vendor = require('./models/Vendor');
const Product = require('./models/Product');

const seed = async () => {
  try {
    await connectDB();
    await User.deleteMany({});
    await Vendor.deleteMany({});
    await Product.deleteMany({});

    const admin = await User.create({ name: 'Admin', email: 'admin@site.com', password: 'password', role: 'admin' });
    const vendor = await Vendor.create({ name: 'Vendor', email: 'vendor@shop.com', password: 'password', shopName: 'Best Shop' });
    const product = await Product.create({ vendor: vendor._id, name: 'Sample Item', description: 'A sample product', price: 99.99, stock: 10 });

    console.log('Seed done');
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seed();
