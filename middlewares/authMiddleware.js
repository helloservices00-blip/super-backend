const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Vendor = require('../models/Vendor');

const protect = async (req, res, next) => {
  let token;
  try {
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      // find by id in User or Vendor
      let user = await User.findById(decoded.id).select('-password');
      if (!user) user = await Vendor.findById(decoded.id).select('-password');
      if (!user) return res.status(401).json({ message: 'Not authorized' });
      req.user = user;
      next();
    } else {
      return res.status(401).json({ message: 'No token' });
    }
  } catch (err) {
    console.error(err);
    res.status(401).json({ message: 'Token failed' });
  }
};

const adminOnly = (req, res, next) => {
  if (req.user && req.user.role === 'admin') next();
  else res.status(403).json({ message: 'Admin only' });
};

module.exports = { protect, adminOnly };
