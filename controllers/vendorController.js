const Vendor = require("../models/Vendor");

// Get all vendors of a specific module
exports.getVendorsByModule = async (req, res) => {
  try {
    const { moduleId } = req.params;
    const vendors = await Vendor.find({ module: moduleId });
    res.json(vendors);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create a new vendor under a module
exports.createVendor = async (req, res) => {
  try {
    const { name, module } = req.body;
    const vendor = new Vendor({ name, module });
    await vendor.save();
    res.status(201).json(vendor);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
