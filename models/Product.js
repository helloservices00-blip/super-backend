import mongoose from "mongoose";
const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  subcategory: { type: mongoose.Schema.Types.ObjectId, ref: "Subcategory" }
});
export default mongoose.model("Product", productSchema);