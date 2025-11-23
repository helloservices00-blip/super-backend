const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const { registerVendor, loginVendor, listVendors } = require('../controllers/vendorController');
const { protect, adminOnly } = require('../middlewares/authMiddleware');

router.post('/register', [
  body('name').notEmpty(),
  body('email').isEmail(),
  body('password').isLength({ min: 6 }),
  body('shopName').notEmpty()
], registerVendor);

router.post('/login', loginVendor);
router.get('/', protect, adminOnly, listVendors);

module.exports = router;
