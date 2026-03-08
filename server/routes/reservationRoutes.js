const express = require("express");
const router = express.Router();
const Reservation = require("../models/Reservation");
const Event = require("../models/Event");

// Create reservation
router.post("/", async (req, res) => {
  const reservation = new Reservation(req.body);
  await reservation.save();
  res.status(201).json(reservation);
});

// Get all reservations
router.get("/", async (req, res) => {
  const reservations = await Reservation.find()
    .populate("customer")
    .populate("packages");
  res.json(reservations);
});

// Get single reservation
router.get("/:id", async (req, res) => {
  const reservation = await Reservation.findById(req.params.id)
    .populate("customer")
    .populate("packages");
  if (!reservation)
    return res.status(404).json({ error: "Reservation not found" });
  res.json(reservation);
});

// Update reservation status
router.put("/:id", async (req, res) => {
  const reservation = await Reservation.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
  );
  if (req.body.status === "confirmed") {
    const reservation = await Reservation.findById(req.params.id);

    const event = new Event({
      reservation: reservation._id,
      eventDate: reservation.eventDate,
      location: reservation.venue.address,
      packages: reservation.packages,
    });

    await event.save();
  }
  res.json(reservation);
});

// Delete reservation
router.delete("/:id", async (req, res) => {
  await Reservation.findByIdAndDelete(req.params.id);
  res.json({ message: "Reservation deleted" });
});

module.exports = router;
