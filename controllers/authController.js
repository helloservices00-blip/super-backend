import User from '../models/User.js';
import Vendor from '../models/Vendor.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const createToken = (user) => jwt.sign({id:user._id, role:user.role, email:user.email}, process.env.JWT_SECRET || 'secret123',{expiresIn:'7d'});

export const register = async (req, res) => {
  try{
    const {name,email,password,role} = req.body;
    if(!name || !email || !password) return res.status(400).json({message:'All fields required'});
    const Model = role==='vendor' ? Vendor : User;
    const exists = await Model.findOne({email});
    if(exists) return res.status(400).json({message:'Email exists'});
    const hash = await bcrypt.hash(password, 10);
    const created = await Model.create({name: name || '', email, passwordHash: hash, role: role || 'customer', shopName: req.body.shopName || undefined});
    const token = createToken(created);
    res.json({message:'Registered', user:{id:created._id, email:created.email, role:created.role}, token});
  }catch(err){
    console.error(err);
    res.status(500).json({message:'Server error'});
  }
};

export const login = async (req, res) => {
  try{
    const {email,password} = req.body;
    const user = await User.findOne({email}) || await Vendor.findOne({email});
    if(!user) return res.status(401).json({message:'Invalid credentials'});
    const match = await bcrypt.compare(password, user.passwordHash);
    if(!match) return res.status(401).json({message:'Invalid credentials'});
    const token = createToken(user);
    res.json({user:{id:user._id, email:user.email, role:user.role}, token});
  }catch(err){
    console.error(err);
    res.status(500).json({message:'Server error'});
  }
};
