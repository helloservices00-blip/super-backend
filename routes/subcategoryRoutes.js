import express from 'express';
import Subcategory from '../models/Subcategory.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

// GET all subcategories
router.get('/', authMiddleware, async (req, res) => {
  try {
    const subcategories = await Subcategory.find({}).populate('categoryId', 'name');
    res.json(subcategories);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// POST a new subcategory
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { name, categoryId } = req.body;
    if (!name || !categoryId) return res.status(400).json({ message: 'Name and categoryId required' });

    const subcategory = await Subcategory.create({ name, categoryId });
    res.json(subcategory);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
