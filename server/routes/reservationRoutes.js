const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");
const {
  createReservation,
  getReservations,
  getReservationById,
  updateReservation,
  deleteReservation,
} = require("../controllers/reservationController");

router.post(
  "/",
  authMiddleware,
  roleMiddleware("customer", "admin"),
  createReservation,
);
router.get("/", authMiddleware, roleMiddleware("admin"), getReservations);
router.get(
  "/:id",
  authMiddleware,
  roleMiddleware("customer", "admin"),
  getReservationById,
);

// customer and admin can edit the reservation details for last minute changes
router.put(
  "/:id",
  authMiddleware,
  roleMiddleware("customer", "admin"),
  updateReservation,
);

// Admin can only delete the reservation
router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware("admin"),
  deleteReservation,
);

module.exports = router;
