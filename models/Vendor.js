import mongoose from 'mongoose';
const schema = new mongoose.Schema({
  shopName: {type:String, required:true},
  ownerName: {type:String},
  email: {type:String, required:true, unique:true},
  passwordHash: {type:String, required:true},
  role: {type:String, default:'vendor'}
},{timestamps:true});
export default mongoose.model('Vendor', schema);
