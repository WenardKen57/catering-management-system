const Payment = require("../models/Payment");
const Reservation = require("../models/Reservation");
const mongoose = require("mongoose");

// Create payment
exports.createPayment = async (req, res) => {
  try {
    const payment = new Payment(req.body);
    await payment.save();
    res.status(201).json(payment);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
};

// Get all payments
exports.getPayments = async (req, res) => {
  try {
    const payments = await Payment.find().populate("reservation");
    res.json(payments);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

// Get single payment
exports.getPaymentById = async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id).populate(
      "reservation",
    );

    if (!payment) {
      res.status(404);
      throw new Error("Payment not found");
    }

    res.json(payment);
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
};

// Update payment
exports.updatePayment = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      res.status(400);
      throw new Error("Invalid package ID");
    }
    const payment = await Payment.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!payment) {
      res.status(404);
      throw new Error("Payment not found");
    }

    // If payment is marked as paid, confirm the reservation
    if (req.body.status === "paid" && payment.reservation) {
      await Reservation.findByIdAndUpdate(payment.reservation, {
        status: "confirmed",
      });
    }

    res.json(payment);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
};

// Delete payment
exports.deletePayment = async (req, res) => {
  try {
    await Payment.findByIdAndDelete(req.params.id);
    res.json({ message: "Payment deleted" });
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
};
