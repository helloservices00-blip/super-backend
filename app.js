import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import moduleRoutes from "./routes/moduleRoutes.js";
import vendorRoutes from "./routes/vendorRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import subcategoryRoutes from "./routes/subcategoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
connectDB();

app.use("/api/modules", moduleRoutes);
app.use("/api/vendors", vendorRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/subcategories", subcategoryRoutes);
app.use("/api/products", productRoutes);

export default app;