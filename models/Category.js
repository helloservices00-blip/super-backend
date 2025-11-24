const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  vendor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Vendor",
    required: true,
  },
});

module.exports = mongoose.model("Category", CategorySchema);
