const Module = require("../models/Module");

exports.getModules = async (req, res) => {
  try {
    const modules = await Module.find();
    res.json(modules);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createModule = async (req, res) => {
  try {
    const mod = new Module({ name: req.body.name });
    await mod.save();
    res.status(201).json(mod);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
