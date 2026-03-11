const Reservation = require("../models/Reservation");
const Event = require("../models/Event");

// Create reservation
exports.createReservation = async (req, res) => {
  try {
    const reservation = new Reservation(req.body);
    await reservation.save();
    res.status(201).json(reservation);
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
};

// Get all reservations
exports.getReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find()
      .populate("customer")
      .populate("packages")
      .populate("payment");
    res.json(reservations);
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
};

// Get single reservation
exports.getReservationById = async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.id)
      .populate("customer")
      .populate("packages")
      .populate("payment");

    if (!reservation) {
      res.status(404);
      throw new Error("Reservation not found");
    }

    res.json(reservation);
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
};

// Update reservation
exports.updateReservation = async (req, res) => {
  try {
    // Update reservation
    const reservation = await Reservation.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
    );

    if (!reservation) {
      res.status(404);
      throw new Error("Reservation not found");
    }

    // If status changed to confirmed, create event
    if (req.body.status === "confirmed") {
      const existingEvent = await Event.findOne({
        reservation: reservation._id,
      });

      // Avoid creating duplicate events
      if (!existingEvent) {
        const event = new Event({
          reservation: reservation._id,
          eventDate: reservation.eventDate,
          location: reservation.venue.address,
          packages: reservation.packages,
        });

        await event.save();
      }
    }

    res.json(reservation);
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
};

// Delete reservation
exports.deleteReservation = async (req, res) => {
  try {
    await Reservation.findByIdAndDelete(req.params.id);
    res.json({ message: "Reservation deleted" });
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
};
