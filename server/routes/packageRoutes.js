const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const {
  createPackage,
  getPackages,
  getPackageById,
  updatePackage,
  deletePackage,
} = require("../controllers/packageController");

router.post("/", authMiddleware, roleMiddleware("admin"), createPackage);
router.get("/", getPackages);
router.get("/:id", getPackageById);
router.put("/:id", authMiddleware, roleMiddleware("admin"), updatePackage);
router.delete("/:id", authMiddleware, roleMiddleware("admin"), deletePackage);

module.exports = router;
