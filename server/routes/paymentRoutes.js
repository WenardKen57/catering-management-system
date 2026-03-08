const express = require("express");
const router = express.Router();
const Payment = require("../models/Payment");
const Reservation = require("../models/Reservation");

// CREATE PAYMENT
router.post("/", async (req, res) => {
  try {
    const payment = new Payment(req.body);
    await payment.save();

    res.status(201).json(payment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// GET ALL PAYMENTS
router.get("/", async (req, res) => {
  try {
    const payments = await Payment.find().populate("reservation");

    res.json(payments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET SINGLE PAYMENT
router.get("/:id", async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id).populate(
      "reservation",
    );

    if (!payment) {
      return res.status(404).json({ message: "Payment not found" });
    }

    res.json(payment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// UPDATE PAYMENT
router.put("/:id", async (req, res) => {
  try {
    const payment = await Payment.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (req.body.status === "paid") {
      await Reservation.findByIdAndUpdate(payment.reservation, {
        status: "confirmed",
      });
    }

    res.json(payment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE PAYMENT
router.delete("/:id", async (req, res) => {
  try {
    await Payment.findByIdAndDelete(req.params.id);

    res.json({ message: "Payment deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
