import express from 'express';
import Category from '../models/Category.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

// GET all categories
router.get('/', authMiddleware, async (req, res) => {
  try {
    const categories = await Category.find({}).populate('shopId', 'name');
    res.json(categories);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// POST a new category
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { name, shopId } = req.body;
    if (!name || !shopId) return res.status(400).json({ message: 'Name and shopId required' });

    const category = await Category.create({ name, shopId });
    res.json(category);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
