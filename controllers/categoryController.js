const Category = require("../models/Category");

// Get all categories under a vendor
exports.getCategoriesByVendor = async (req, res) => {
  try {
    const { vendorId } = req.params;
    const categories = await Category.find({ vendor: vendorId });
    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create a new category under a vendor
exports.createCategory = async (req, res) => {
  try {
    const { name, vendor } = req.body;
    const category = new Category({ name, vendor });
    await category.save();
    res.status(201).json(category);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
