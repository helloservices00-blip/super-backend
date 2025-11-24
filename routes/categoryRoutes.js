const router = require("express").Router();
const { getCategoriesByVendor, createCategory } = require("../controllers/categoryController");

// relative to app.js /api/vendors
router.get("/:vendorId/categories", getCategoriesByVendor);
router.post("/", createCategory);

module.exports = router;
