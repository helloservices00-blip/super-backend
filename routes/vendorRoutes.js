const router = require("express").Router();
const { getVendorsByModule, createVendor } = require("../controllers/vendorController");

// relative to app.js /api/modules
router.get("/:moduleId/vendors", getVendorsByModule);
router.post("/", createVendor);

module.exports = router;
