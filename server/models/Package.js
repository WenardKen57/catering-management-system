const mongoose = require("mongoose");

const packageSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    items: [{ type: String }],
  },
  { timestamps: true },
);

module.exports = mongoose.model("Package", packageSchema);
