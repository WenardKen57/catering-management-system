const Package = require("../models/Package");

// Create package
exports.createPackage = async (req, res) => {
  try {
    const pkg = new Package(req.body);
    await pkg.save();
    res.status(201).json(pkg);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all packages
exports.getPackages = async (req, res) => {
  try {
    const packages = await Package.find();
    res.json(packages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get single package
exports.getPackageById = async (req, res) => {
  try {
    const pkg = await Package.findById(req.params.id);

    if (!pkg) {
      return res.status(404).json({ error: "Package not found" });
    }

    res.json(pkg);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update package
exports.updatePackage = async (req, res) => {
  try {
    const pkg = await Package.findByIdAndUpdate(
      req.params.id,
      req.body,
      { returnDocument: "after" }
    );

    res.json(pkg);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete package
exports.deletePackage = async (req, res) => {
  try {
    await Package.findByIdAndDelete(req.params.id);
    res.json({ message: "Package deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};