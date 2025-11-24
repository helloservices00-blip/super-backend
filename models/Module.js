import mongoose from "mongoose";
const moduleSchema = new mongoose.Schema({ name: { type: String, required: true }});
export default mongoose.model("Module", moduleSchema);