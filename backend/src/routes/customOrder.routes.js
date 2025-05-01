const express = require("express");
const router = express.Router();
const CustomOrder = require("../models/customOrder.model");
const auth = require("../middleware/auth");
const multer = require("multer");
const path = require("path");

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../../uploads/custom-orders"));
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5000000 }, // 5MB limit
  fileFilter: function (req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error("Please upload an image file (jpg, jpeg, png)"));
    }
    cb(null, true);
  },
});

// Create custom order
router.post("/", auth, upload.array("referenceImages", 5), async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      sareeType,
      material,
      color,
      budget,
      designDescription,
      additionalNotes,
    } = req.body;

    // Get image paths if any
    const imagePaths = req.files
      ? req.files.map((file) => `/uploads/custom-orders/${file.filename}`)
      : [];

    const customOrder = new CustomOrder({
      user: req.user._id,
      name,
      email,
      phone,
      sareeType,
      material,
      color,
      budget: Number(budget),
      designDescription,
      referenceImages: imagePaths,
      additionalNotes,
    });

    await customOrder.save();

    res.status(201).json({
      success: true,
      customOrder,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error creating custom order",
      error: error.message,
    });
  }
});

// Get all custom orders for user
router.get("/", auth, async (req, res) => {
  try {
    const customOrders = await CustomOrder.find({ user: req.user._id }).sort({
      createdAt: -1,
    });

    res.json({
      success: true,
      customOrders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching custom orders",
      error: error.message,
    });
  }
});

// Get single custom order
router.get("/:id", auth, async (req, res) => {
  try {
    const customOrder = await CustomOrder.findById(req.params.id);

    if (!customOrder) {
      return res.status(404).json({
        success: false,
        message: "Custom order not found",
      });
    }

    // Check if custom order belongs to user or user is admin
    if (
      customOrder.user.toString() !== req.user._id.toString() &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to view this custom order",
      });
    }

    res.json({
      success: true,
      customOrder,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching custom order",
      error: error.message,
    });
  }
});

// Admin routes

// Get all custom orders (admin only)
router.get("/admin/all", auth, async (req, res) => {
  try {
    // Check if user is admin
    if (req.user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Not authorized to access all custom orders",
      });
    }

    const customOrders = await CustomOrder.find({})
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      customOrders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching custom orders",
      error: error.message,
    });
  }
});

// Update custom order status (admin only)
router.patch("/admin/:id", auth, async (req, res) => {
  try {
    // Check if user is admin
    if (req.user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Not authorized to update custom order status",
      });
    }

    const { status, adminNotes, estimatedDelivery, quotedPrice } = req.body;

    const customOrder = await CustomOrder.findById(req.params.id);

    if (!customOrder) {
      return res.status(404).json({
        success: false,
        message: "Custom order not found",
      });
    }

    if (status) customOrder.status = status;
    if (adminNotes) customOrder.adminNotes = adminNotes;
    if (estimatedDelivery) customOrder.estimatedDelivery = estimatedDelivery;
    if (quotedPrice) customOrder.quotedPrice = quotedPrice;

    const updatedCustomOrder = await customOrder.save();

    res.json({
      success: true,
      customOrder: updatedCustomOrder,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error updating custom order status",
      error: error.message,
    });
  }
});

module.exports = router;
