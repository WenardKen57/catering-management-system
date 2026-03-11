const mongoose = require("mongoose");
const addonSchema = require("./schemas/Addon");

const packageSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    menu: [{ type: String }],
    services: [{ type: String }],
    addons: [addonSchema],
  },
  { timestamps: true },
);

module.exports = mongoose.model("Package", packageSchema);
