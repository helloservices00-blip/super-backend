import express from "express";
import Product from "../models/Product.js";
const router = express.Router();
router.get("/", async (req, res) => res.json(await Product.find()));
export default router;