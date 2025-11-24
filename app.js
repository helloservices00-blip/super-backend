const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const moduleRoutes = require("./routes/moduleRoutes");
const vendorRoutes = require("./routes/vendorRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const productRoutes = require("./routes/productRoutes");

const app = express();

app.use(cors({
  origin: ["http://localhost:3000", "https://your-frontend-domain.com"], // allow frontend
  credentials: true,
}));
app.use(express.json());

// API routes
app.use("/api/modules", moduleRoutes);
app.use("/api/modules", vendorRoutes);       // /api/modules/:moduleId/vendors
app.use("/api/vendors", categoryRoutes);     // /api/vendors/:vendorId/categories
app.use("/api/categories", productRoutes);   // /api/categories/:categoryId/products

// Optional landing route
app.get("/api", (req, res) => {
  res.json({ message: "API running", routes: ["/modules", "/vendors", "/categories", "/products"] });
});

module.exports = app;
