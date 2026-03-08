const mongoose = require("mongoose");

const reservationSchema = mongoose.Schema({
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  packages: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Package", required: true },
  ],
  eventDate: { type: Date, required: true },
  venue: {
    name: { type: String },
    address: { type: String },
    notes: { type: String }, // notes about the venue
  },
  totalPrice: { type: Number, required: true },

  status: {
    type: String,
    enum: ["reserved", "pendingPayment", "confirmed", "completed", "cancelled"],
    default: "reserved",
  },

  notes: { type: String },

  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Reservation", reservationSchema);
