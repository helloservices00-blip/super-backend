import express from 'express';
import { listVendors } from '../controllers/vendorController.js';
import { auth } from '../middlewares/auth.js';
const router = express.Router();

router.get('/', auth(), listVendors);

export default router;
