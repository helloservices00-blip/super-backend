import express from 'express';
import Vendor from '../models/Vendor.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

// GET all vendors
router.get('/', authMiddleware, async (req, res) => {
  try {
    const vendors = await Vendor.find({});
    res.json(vendors);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// POST a new vendor
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).json({ message: 'Name required' });

    const vendor = await Vendor.create({ name });
    res.json(vendor);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
