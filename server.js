import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import productRoutes from './routes/productRoutes.js';
import vendorRoutes from './routes/vendorRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import adminRoutes from './routes/adminRoutes.js';

dotenv.config();

const app = express();
app.use(cors({
  origin: process.env.FRONTEND_URL || '*',
  methods: ['GET','POST','PUT','DELETE','OPTIONS'],
  allowedHeaders: ['Content-Type','Authorization']
}));
app.use(express.json());

// Basic root
app.get('/', (req, res) => res.send('Super Backend Running'));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/vendors', vendorRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/admin', adminRoutes);

// MongoDB connection
const MONGO = process.env.MONGO_URI;
if(!MONGO){
  console.error('Missing MONGO_URI in environment. Create .env or set MONGO_URI');
} 
mongoose.connect(MONGO, {
  // mongoose options
}).then(()=> console.log('MongoDB connect
const PORT = process.env.PORT || 10000;
app.listen(PORT, '0.0.0.0', ()=> console.log(`Server running on port ${PORT}`)
