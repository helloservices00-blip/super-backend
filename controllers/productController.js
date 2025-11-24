const Product = require("../models/Product");

// Get all products under a subcategory
exports.getProductsBySubcategory = async (req, res) => {
  try {
    const { subcategoryId } = req.params;
    const products = await Product.find({ subcategory: subcategoryId });
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create a new product under a subcategory
exports.createProduct = async (req, res) => {
  try {
    const { name, price, subcategory } = req.body;
    const product = new Product({ name, price, subcategory });
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
