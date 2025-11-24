import express from "express";
import Category from "../models/Category.js";
const router = express.Router();
router.get("/", async (req, res) => res.json(await Category.find()));
export default router;