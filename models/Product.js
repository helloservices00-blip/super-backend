import mongoose from 'mongoose';
const schema = new mongoose.Schema({
  name: {type:String, required:true},
  description: {type:String},
  price: {type:Number, required:true},
  categoryId: {type:mongoose.Schema.Types.ObjectId, ref:'Category'},
  vendorId: {type:mongoose.Schema.Types.ObjectId, ref:'Vendor'},
  images: [String],
  stock: {type:Number, default:0}
},{timestamps:true});
export default mongoose.model('Product', schema);
