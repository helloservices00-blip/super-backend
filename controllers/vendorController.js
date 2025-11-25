import Vendor from '../models/Vendor.js';

export const listVendors = async (req,res) => {
  const v = await Vendor.find({});
  res.json(v);
};
