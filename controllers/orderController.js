import Order from '../models/Order.js';
import Product from '../models/Product.js';

export const createOrder = async (req,res) => {
  const {products} = req.body;
  if(!products || !products.length) return res.status(400).json({message:'No products'});
  let total = 0;
  for(const it of products){
    const p = await Product.findById(it.productId);
    if(p) total += p.price * (it.qty||1);
  }
  const order = await Order.create({userId: req.user.id, products, total});
  res.json(order);
};

export const listOrders = async (req,res) => {
  const orders = await Order.find({userId:req.user.id});
  res.json(orders);
};
