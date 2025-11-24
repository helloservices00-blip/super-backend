// models/Shop.js
import mongoose from "mongoose";

const shopSchema = new mongoose.Schema({
  name: { type: String, required: true },
  module: { type: mongoose.Schema.Types.ObjectId, ref: "Module" }
}, { timestamps: true });

export default mongoose.model("Shop", shopSchema);
