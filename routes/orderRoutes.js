import express from 'express';
import { createOrder, listOrders } from '../controllers/orderController.js';
import { auth } from '../middlewares/auth.js';
const router = express.Router();

router.post('/', auth(), createOrder);
router.get('/', auth(), listOrders);

export default router;
