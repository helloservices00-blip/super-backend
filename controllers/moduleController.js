const Module = require('../models/Module');

exports.getModules = async (req, res) => {
  try {
    const modules = await Module.find({});
    res.status(200).json(modules);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
