import mongoose from "mongoose";
const vendorSchema = new mongoose.Schema({
  name: String,
  module: { type: mongoose.Schema.Types.ObjectId, ref: "Module" }
});
export default mongoose.model("Vendor", vendorSchema);