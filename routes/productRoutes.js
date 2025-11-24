const router = require("express").Router();
const { getProductsBySubcategory, createProduct } = require("../controllers/productController");

// relative to app.js /api/subcategories
router.get("/:subcategoryId/products", getProductsBySubcategory);
router.post("/", createProduct);

module.exports = router;
