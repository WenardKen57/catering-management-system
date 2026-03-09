const mongoose = require("mongoose");

const addonSchema = mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  type: { type: String, enum: ["food", "service"], required: true },
});

module.exports = addonSchema;
