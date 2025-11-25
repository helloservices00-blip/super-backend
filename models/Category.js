import mongoose from 'mongoose';
const schema = new mongoose.Schema({
  name: {type:String, required:true},
  shopId: {type:mongoose.Schema.Types.ObjectId, ref:'Shop'}
},{timestamps:true});
export default mongoose.model('Category', schema);
