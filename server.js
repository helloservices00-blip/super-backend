import express from "express";
import cors from "cors";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import dotenv from "dotenv";

import User from "./models/User.js";
import Module from "./models/Module.js";
import Shop from "./models/Shop.js";
import Category from "./models/Category.js";
import Subcategory from "./models/Subcategory.js";
import Product from "./models/Product.js";
import Vendor from "./models/Vendor.js";
import Order from "./models/Order.js";

dotenv.config();

const app = express();
app.use(express.json());

// --------------------
// CORS
// --------------------
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// --------------------
// MongoDB Connection
// --------------------
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

// --------------------
// Auth Middleware
// --------------------
const authMiddleware = async (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "No token provided" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "secret123");
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};

// --------------------
// REGISTER
// --------------------
app.post("/api/auth/register", async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password || !role)
      return res.status(400).json({ message: "All fields are required" });

    if (await User.findOne({ email }))
      return res.status(400).json({ message: "Email already exists" });

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, passwordHash, role });

    res.json({ message: "Registered successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// --------------------
// LOGIN
// --------------------
app.post("/api/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET || "secret123",
      { expiresIn: "1d" }
    );

    res.json({
      user: { id: user._id, name: user.name, email: user.email, role: user.role },
      token,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// --------------------
// MODULES
// --------------------
app.get("/api/modules", async (req, res) => {
  const modules = await Module.find({});
  res.json(modules);
});

// --------------------
// SHOPS
// --------------------
app.get("/api/shops", async (req, res) => {
  const shops = await Shop.find({}).populate("moduleId", "name");
  res.json(shops);
});

// --------------------
// CATEGORIES & SUBCATEGORIES
// --------------------
app.get("/api/categories", async (req, res) => {
  const categories = await Category.find({}).populate("shopId", "name");
  res.json(categories);
});

app.get("/api/subcategories", async (req, res) => {
  const subcategories = await Subcategory.find({}).populate("categoryId", "name");
  res.json(subcategories);
});

// --------------------
// PRODUCTS
// --------------------
app.get("/api/products", async (req, res) => {
  const products = await Product.find({})
    .populate("categoryId", "name")
    .populate("vendorId", "name");
  res.json(products);
});

app.get("/api/products/:id", async (req, res) => {
  const product = await Product.findById(req.params.id)
    .populate("categoryId", "name")
    .populate("vendorId", "name");
  if (!product) return res.status(404).json({ message: "Product not found" });
  res.json(product);
});

app.post("/api/products", authMiddleware, async (req, res) => {
  const { name, price, categoryId, vendorId, description } = req.body;
  const product = await Product.create({ name, price, categoryId, vendorId, description });
  res.json(product);
});

// --------------------
// VENDORS
// --------------------
app.get("/api/vendors", async (req, res) => {
  const vendors = await Vendor.find({});
  res.json(vendors);
});

// --------------------
// ORDERS
// --------------------
app.post("/api/orders", authMiddleware, async (req, res) => {
  const { products: orderProducts } = req.body;
  if (!orderProducts || !orderProducts.length)
    return res.status(400).json({ message: "No products in order" });

  let total = 0;
  for (const item of orderProducts) {
    const prod = await Product.findById(item.productId);
    if (prod) total += prod.price * item.qty;
  }

  const order = await Order.create({
    userId: req.user.id,
    products: orderProducts,
    total,
  });

  res.json(order);
});

app.get("/api/orders", authMiddleware, async (req, res) => {
  const orders = await Order.find({ userId: req.user.id });
  res.json(orders);
});

// --------------------
// START SERVER
// --------------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
