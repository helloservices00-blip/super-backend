import Module from "../models/Module.js";

export const getModules = async (req, res) => {
  try {
    const modules = await Module.find({});
    res.status(200).json(modules);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
