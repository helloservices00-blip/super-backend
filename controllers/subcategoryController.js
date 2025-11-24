const Subcategory = require("../models/Subcategory");

// Get all subcategories under a category
exports.getSubcategoriesByCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const subcategories = await Subcategory.find({ category: categoryId });
    res.json(subcategories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create a new subcategory under a category
exports.createSubcategory = async (req, res) => {
  try {
    const { name, category } = req.body;
    const subcategory = new Subcategory({ name, category });
    await subcategory.save();
    res.status(201).json(subcategory);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
