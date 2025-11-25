import express from 'express';
import { listUsers } from '../controllers/adminController.js';
import { auth } from '../middlewares/auth.js';
const router = express.Router();

router.get('/users', auth(['admin']), listUsers);

export default router;
