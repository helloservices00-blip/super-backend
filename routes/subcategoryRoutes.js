const router = require("express").Router();
const { getSubcategoriesByCategory, createSubcategory } = require("../controllers/subcategoryController");

// relative to app.js /api/categories
router.get("/:categoryId/subcategories", getSubcategoriesByCategory);
router.post("/", createSubcategory);

module.exports = router;
