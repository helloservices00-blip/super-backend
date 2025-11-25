import mongoose from 'mongoose';
const schema = new mongoose.Schema({
  name: {type:String, required:true},
  moduleId: {type:mongoose.Schema.Types.ObjectId, ref:'Module'}
},{timestamps:true});
export default mongoose.model('Shop', schema);
