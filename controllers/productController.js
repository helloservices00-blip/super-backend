import Product from '../models/Product.js';

export const listProducts = async (req,res) => {
  const products = await Product.find({}).populate('categoryId vendorId','name');
  res.json(products);
};

export const getProduct = async (req,res) => {
  const p = await Product.findById(req.params.id);
  if(!p) return res.status(404).json({message:'Not found'});
  res.json(p);
};

export const createProduct = async (req,res) => {
  const {name,price,categoryId,vendorId,description,stock} = req.body;
  const created = await Product.create({name,price,categoryId,vendorId,description,stock});
  res.json(created);
};
