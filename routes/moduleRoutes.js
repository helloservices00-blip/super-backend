import express from "express";
import Module from "../models/Module.js";
const router = express.Router();
router.get("/", async (req, res) => res.json(await Module.find()));
export default router;