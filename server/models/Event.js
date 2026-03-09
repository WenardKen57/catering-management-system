/*
  scheduled – Event is planned, staff and resources assigned.
  inProgress – Event is actively happening. Staff are on-site.
  completed – Event finished successfully. Data can be reported.
  cancelled – Event called off, possibly due to customer cancellation or internal reasons.
 */

const mongoose = require("mongoose");

const eventSchema = mongoose.Schema(
  {
    reservation: {
      type: mongoose.Types.ObjectId,
      ref: "Reservation",
      required: true,
    },
    eventName: { type: String },
    eventDate: { type: Date, required: true },
    location: { type: String, required: true },
    packages: [
      { type: mongoose.Types.ObjectId, ref: "Package", required: true },
    ],

    staffAssigned: [{ type: mongoose.Types.ObjectId, ref: "User" }],

    status: {
      type: String,
      enum: ["scheduled", "inProgress", "completed", "cancelled"],
      default: "scheduled",
    },

    notes: { type: String },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Event", eventSchema);
