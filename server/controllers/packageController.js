const Package = require("../models/Package");
const mongoose = require("mongoose");

// Create package
exports.createPackage = async (req, res) => {
  try {
    const pkg = new Package(req.body);
    await pkg.save();
    res.status(201).json(pkg);
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
};

// Get all packages
exports.getPackages = async (req, res) => {
  try {
    const packages = await Package.find();
    res.json(packages);
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
};

// Get single package
exports.getPackageById = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      res.status(400);
      throw new Error("Invalid package ID");
    }

    const pkg = await Package.findById(req.params.id);

    if (!pkg) {
      res.status(404);
      throw new Error("Package not found");
    }

    res.json(pkg);
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
};

// Update package
exports.updatePackage = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      res.status(400);
      throw new Error("Invalid package ID");
    }

    const pkg = await Package.findByIdAndUpdate(req.params.id, req.body, {
      returnDocument: "after",
    });

    if (!pkg) {
      res.status(404);
      throw new Error("Package not found");
    }

    res.json(pkg);
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
};

// Delete package
exports.deletePackage = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      res.status(400);
      throw new Error("Invalid package ID");
    }
    await Package.findByIdAndDelete(req.params.id);
    res.json({ message: "Package deleted" });
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
};
