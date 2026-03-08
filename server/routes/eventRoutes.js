const express = require("express");
const router = express.Router();
const Event = require("../models/Event");

// Create event
router.post("/", async (req, res) => {
  const event = new Reservation(req.body);
  await event.save();
  res.status(201).json(reservation);
});

// Get all events
router.get("/", async (req, res) => {
  const events = await Event.find().populate("customer").populate("packages");
  res.json(events);
});

// Get single events
router.get("/:id", async (req, res) => {
  const event = await Event.findById(req.params.id)
    .populate("customer")
    .populate("packages");
  if (!event) return res.status(404).json({ error: "Event not found" });
  res.json(event);
});

// Update event status
router.put("/:id", async (req, res) => {
  const event = await event.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(event);
});

// Delete event
router.delete("/:id", async (req, res) => {
  await Event.findByIdAndDelete(req.params.id);
  res.json({ message: "Event deleted" });
});

module.exports = router;
