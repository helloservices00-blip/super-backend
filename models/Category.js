import mongoose from "mongoose";
const categorySchema = new mongoose.Schema({
  name: String,
  module: { type: mongoose.Schema.Types.ObjectId, ref: "Module" }
});
export default mongoose.model("Category", categorySchema);