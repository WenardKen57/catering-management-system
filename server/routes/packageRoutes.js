const express = require("express");
const router = express.Router();
const Package = require("../models/Package");

// Create package
router.post("/", async (req, res) => {
  const pkg = new Package(req.body);
  await pkg.save();
  res.status(201).json(pkg);
});

// Get all packages
router.get("/", async (req, res) => {
  const packages = await Package.find();
  res.json(packages);
});

// Get single package
router.get("/:id", async (req, res) => {
  const pkg = await Package.findById(req.params.id);
  if (!pkg) return res.status(404).json({ error: "Package not found" });
  res.json(pkg);
});

// Update package
router.put("/:id", async (req, res) => {
  const pkg = await Package.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(pkg);
});

// Delete package
router.delete("/:id", async (req, res) => {
  await Package.findByIdAndDelete(req.params.id);
  res.json({ message: "Package deleted" });
});

module.exports = router;
