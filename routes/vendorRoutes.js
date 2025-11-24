import express from "express";
import Vendor from "../models/Vendor.js";
const router = express.Router();
router.get("/", async (req, res) => res.json(await Vendor.find()));
export default router;