import mongoose from 'mongoose';
const schema = new mongoose.Schema({
  userId: {type:mongoose.Schema.Types.ObjectId, ref:'User'},
  products: [{productId:{type:mongoose.Schema.Types.ObjectId, ref:'Product'}, qty:Number}],
  total: {type:Number, default:0},
  status: {type:String, default:'pending'}
},{timestamps:true});
export default mongoose.model('Order', schema);
