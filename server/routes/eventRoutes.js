const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const {
  createEvent,
  getEvents,
  getEventById,
  updateEvent,
  deleteEvent,
} = require("../controllers/eventController");

router.post("/", authMiddleware, roleMiddleware("admin"), createEvent);
router.get("/", authMiddleware, roleMiddleware("admin"), getEvents);
router.get("/:id", authMiddleware, roleMiddleware("admin"), getEventById);
router.put("/:id", authMiddleware, roleMiddleware("admin"), updateEvent);
router.delete("/:id", authMiddleware, roleMiddleware("admin"), deleteEvent);

module.exports = router;
