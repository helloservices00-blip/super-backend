import express from 'express';
import Module from '../models/Module.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

// GET all modules
router.get('/', authMiddleware, async (req, res) => {
  try {
    const modules = await Module.find({});
    res.json(modules);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// POST a new module
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).json({ message: 'Module name is required' });

    const existing = await Module.findOne({ name });
    if (existing) return res.status(400).json({ message: 'Module already exists' });

    const module = await Module.create({ name });
    res.json(module);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
