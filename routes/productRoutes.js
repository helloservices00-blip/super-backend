const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const { createProduct, getProducts, updateProduct, deleteProduct } = require('../controllers/productController');
const { protect } = require('../middlewares/authMiddleware');

router.post('/', protect, [
  body('name').notEmpty(),
  body('price').isNumeric()
], createProduct);

router.get('/', getProducts);
router.put('/:id', protect, updateProduct);
router.delete('/:id', protect, deleteProduct);

module.exports = router;
