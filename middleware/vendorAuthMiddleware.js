const jwt = require("jsonwebtoken");
const Vendor = require("../models/Vendor");

const vendorAuthMiddleware = async (req, res, next) => {
  try {
    let token = req.header("Authorization");

    if (!token) {
      return res.status(401).json({ message: "No token, authorization denied" });
    }

    // Token format: "Bearer xxx"
    if (token.startsWith("Bearer ")) {
      token = token.split(" ")[1];
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Check vendor in DB
    const vendor = await Vendor.findById(decoded.id).select("-password");

    if (!vendor) {
      return res.status(401).json({ message: "Vendor not found" });
    }

    req.vendor = vendor;

    next();

  } catch (err) {
    res.status(401).json({ message: "Invalid or expired token" });
  }
};

module.exports = vendorAuthMiddleware;
