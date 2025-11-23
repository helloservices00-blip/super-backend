const express = require('express');
const router = express.Router();
const { createOrder, getOrders, updateStatus } = require('../controllers/orderController');
const { protect } = require('../middlewares/authMiddleware');

router.post('/', protect, createOrder);
router.get('/', protect, getOrders);
router.put('/:id/status', protect, updateStatus);

module.exports = router;
