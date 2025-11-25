import express from 'express';
import { listProducts, getProduct, createProduct } from '../controllers/productController.js';
import { auth } from '../middlewares/auth.js';
const router = express.Router();

router.get('/', auth(), listProducts);
router.get('/:id', auth(), getProduct);
router.post('/', auth(['admin','vendor']), createProduct);

export default router;
