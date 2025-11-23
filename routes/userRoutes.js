const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const { registerUser, loginUser, getProfile } = require('../controllers/userController');
const { protect } = require('../middlewares/authMiddleware');

router.post('/register', [
  body('name').notEmpty(),
  body('email').isEmail(),
  body('password').isLength({ min: 6 })
], registerUser);

router.post('/login', loginUser);
router.get('/profile', protect, getProfile);

module.exports = router;
