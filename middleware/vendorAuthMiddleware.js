const jwt = require("jsonwebtoken");
const Vendor = require("../models/Vendor");

module.exports = async (req, res, next) => {
  try {
    let token = req.header("Authorization");

    if (!token) {
      return res.status(401).json({ message: "No token, authorization denied" });
    }

    if (token.startsWith("Bearer ")) {
      token = token.split(" ")[1];
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const vendor = await Vendor.findById(decoded.id).select("-password");
    if (!vendor) {
      return res.status(401).json({ message: "Vendor not found" });
    }

    req.vendor = vendor;

    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
