import express from "express";
import Subcategory from "../models/Subcategory.js";
const router = express.Router();
router.get("/", async (req, res) => res.json(await Subcategory.find()));
export default router;