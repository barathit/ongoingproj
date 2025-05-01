const express = require("express");
const router = express.Router();
const Prebook = require("../models/prebook.model");
const Product = require("../models/product.model");
const auth = require("../middleware/auth");

// Create prebook order
router.post("/", auth, async (req, res) => {
  try {
    const {
      productId,
      name,
      email,
      phone,
      quantity,
      advanceAmount,
      expectedDeliveryDate,
      notes,
    } = req.body;

    // Validate product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    const prebook = new Prebook({
      user: req.user._id,
      product: productId,
      name,
      email,
      phone,
      quantity: Number(quantity) || 1,
      advanceAmount: Number(advanceAmount),
      expectedDeliveryDate,
      notes,
    });

    await prebook.save();

    res.status(201).json({
      success: true,
      prebook,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error creating prebook order",
      error: error.message,
    });
  }
});

// Get all prebook orders for user
router.get("/", auth, async (req, res) => {
  try {
    const prebooks = await Prebook.find({ user: req.user._id })
      .populate("product", "name price images")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      prebooks,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching prebook orders",
      error: error.message,
    });
  }
});

// Get single prebook order
router.get("/:id", auth, async (req, res) => {
  try {
    const prebook = await Prebook.findById(req.params.id).populate(
      "product",
      "name price images description"
    );

    if (!prebook) {
      return res.status(404).json({
        success: false,
        message: "Prebook order not found",
      });
    }

    // Check if prebook order belongs to user or user is admin
    if (
      prebook.user.toString() !== req.user._id.toString() &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to view this prebook order",
      });
    }

    res.json({
      success: true,
      prebook,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching prebook order",
      error: error.message,
    });
  }
});

// Update prebook payment status
router.patch("/:id/payment", auth, async (req, res) => {
  try {
    const { paymentId, paymentStatus } = req.body;

    const prebook = await Prebook.findById(req.params.id);

    if (!prebook) {
      return res.status(404).json({
        success: false,
        message: "Prebook order not found",
      });
    }

    // Check if prebook order belongs to user or user is admin
    if (
      prebook.user.toString() !== req.user._id.toString() &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to update this prebook order",
      });
    }

    prebook.paymentId = paymentId;
    prebook.paymentStatus = paymentStatus || "Paid";

    const updatedPrebook = await prebook.save();

    res.json({
      success: true,
      prebook: updatedPrebook,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error updating payment status",
      error: error.message,
    });
  }
});

// Cancel prebook order
router.patch("/:id/cancel", auth, async (req, res) => {
  try {
    const prebook = await Prebook.findById(req.params.id);

    if (!prebook) {
      return res.status(404).json({
        success: false,
        message: "Prebook order not found",
      });
    }

    // Check if prebook order belongs to user or user is admin
    if (
      prebook.user.toString() !== req.user._id.toString() &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to cancel this prebook order",
      });
    }

    // Only allow cancellation if order is still pending or confirmed
    if (!["Pending", "Confirmed"].includes(prebook.status)) {
      return res.status(400).json({
        success: false,
        message: "Prebook order cannot be cancelled at this stage",
      });
    }

    prebook.status = "Cancelled";
    const updatedPrebook = await prebook.save();

    res.json({
      success: true,
      prebook: updatedPrebook,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error cancelling prebook order",
      error: error.message,
    });
  }
});

// Admin routes

// Get all prebook orders (admin only)
router.get("/admin/all", auth, async (req, res) => {
  try {
    // Check if user is admin
    if (req.user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Not authorized to access all prebook orders",
      });
    }

    const prebooks = await Prebook.find({})
      .populate("user", "name email")
      .populate("product", "name price images")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      prebooks,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching prebook orders",
      error: error.message,
    });
  }
});

// Update prebook order status (admin only)
router.patch("/admin/:id", auth, async (req, res) => {
  try {
    // Check if user is admin
    if (req.user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Not authorized to update prebook order status",
      });
    }

    const { status, notes, expectedDeliveryDate } = req.body;

    const prebook = await Prebook.findById(req.params.id);

    if (!prebook) {
      return res.status(404).json({
        success: false,
        message: "Prebook order not found",
      });
    }

    if (status) prebook.status = status;
    if (notes) prebook.notes = notes;
    if (expectedDeliveryDate)
      prebook.expectedDeliveryDate = expectedDeliveryDate;

    const updatedPrebook = await prebook.save();

    res.json({
      success: true,
      prebook: updatedPrebook,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error updating prebook order status",
      error: error.message,
    });
  }
});

module.exports = router;
