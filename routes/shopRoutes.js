import express from 'express';
import Shop from '../models/Shop.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

// GET all shops
router.get('/', authMiddleware, async (req, res) => {
  try {
    const shops = await Shop.find({}).populate('moduleId', 'name');
    res.json(shops);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// POST a new shop
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { name, moduleId } = req.body;
    if (!name || !moduleId) return res.status(400).json({ message: 'Name and moduleId required' });

    const shop = await Shop.create({ name, moduleId });
    res.json(shop);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
