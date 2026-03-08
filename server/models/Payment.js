const mongoose = require("mongoose");

const paymentSchema = mongoose.Schema({
  reservation: {
    type: mongoose.Types.ObjectId,
    ref: "Reservation",
    required: true,
  },
  amount: { type: Number, required: true },
  method: { type: String, enum: ["cash", "card", "online"], required: true },
  status: { type: String, enum: ["pending", "paid", "failed"] },
  paidAt: { type: Date, default: Date.now },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Payment", paymentSchema);
