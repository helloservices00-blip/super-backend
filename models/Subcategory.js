import mongoose from 'mongoose';
const schema = new mongoose.Schema({
  name: {type:String, required:true},
  categoryId: {type:mongoose.Schema.Types.ObjectId, ref:'Category'}
},{timestamps:true});
export default mongoose.model('Subcategory', schema);
