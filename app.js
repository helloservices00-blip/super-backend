const express = require("express");
const cors = require("cors");
const moduleRoutes = require("./routes/moduleRoutes");
const vendorRoutes = require("./routes/vendorRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const productRoutes = require("./routes/productRoutes");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/modules", moduleRoutes);
app.use("/api/modules", vendorRoutes);
app.use("/api/vendors", categoryRoutes);
app.use("/api/categories", productRoutes);

app.get("/api", (req, res) => res.json({ message: "API running" }));

module.exports = app;
