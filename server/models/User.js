const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String },
  address: { type: String },
  role: {
    type: String,
    enum: ["customer", "admin", "manager", "staff"],
    default: "customer",
  },
  customerInfo: {
    preferences: { type: Object },
    loyaltyPoints: { type: Number, default: 0 },
  },
  staffInfo: {
    position: { type: String },
    assignedEvents: [{ type: mongoose.Types.ObjectId, ref: "Event" }],
  },
  managerInfo: {
    managedStaff: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    department: { type: String },
  },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("User", userSchema);
