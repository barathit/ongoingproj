const express = require("express");
const router = express.Router();
const Order = require("../models/order.model");
const Cart = require("../models/cart.model");
const Product = require("../models/product.model");
const auth = require("../middleware/auth");

// Create new order
router.post("/", auth, async (req, res) => {
  try {
    const {
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    } = req.body;

    // Get user's cart
    const cart = await Cart.findOne({ user: req.user._id }).populate({
      path: "items.product",
      select: "name price images stock",
    });

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No items in cart",
      });
    }

    // Check stock availability and prepare order items
    const orderItems = [];
    for (const item of cart.items) {
      const product = item.product;

      if (product.stock < item.quantity) {
        return res.status(400).json({
          success: false,
          message: `Not enough stock for ${product.name}`,
        });
      }

      orderItems.push({
        product: product._id,
        name: product.name,
        quantity: item.quantity,
        price: product.price,
        image: product.images[0],
      });

      // Update product stock
      await Product.findByIdAndUpdate(product._id, {
        $inc: { stock: -item.quantity },
      });
    }

    // Create order
    const order = new Order({
      user: req.user._id,
      items: orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });

    await order.save();

    // Clear cart after successful order
    cart.items = [];
    await cart.save();

    res.status(201).json({
      success: true,
      order,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error creating order",
      error: error.message,
    });
  }
});

// Get all orders for user
router.get("/", auth, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({
      createdAt: -1,
    });

    res.json({
      success: true,
      orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching orders",
      error: error.message,
    });
  }
});

// Get single order
router.get("/:id", auth, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    // Check if order belongs to user or user is admin
    if (
      order.user.toString() !== req.user._id.toString() &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to view this order",
      });
    }

    res.json({
      success: true,
      order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching order",
      error: error.message,
    });
  }
});

// Update order to paid
router.patch("/:id/pay", auth, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    // Check if order belongs to user or user is admin
    if (
      order.user.toString() !== req.user._id.toString() &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to update this order",
      });
    }

    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.email_address,
    };

    const updatedOrder = await order.save();

    res.json({
      success: true,
      order: updatedOrder,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error updating order",
      error: error.message,
    });
  }
});

// Get order tracking info
router.get("/:id/tracking", auth, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    // Check if order belongs to user or user is admin
    if (
      order.user.toString() !== req.user._id.toString() &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to view this order",
      });
    }

    res.json({
      success: true,
      tracking: {
        orderId: order._id,
        status: order.status,
        trackingNumber: order.trackingNumber || "Not available yet",
        isDelivered: order.isDelivered,
        deliveredAt: order.deliveredAt,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching tracking information",
      error: error.message,
    });
  }
});

// Admin routes

// Get all orders (admin only)
router.get("/admin/all", auth, async (req, res) => {
  try {
    // Check if user is admin
    if (req.user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Not authorized to access all orders",
      });
    }

    const orders = await Order.find({})
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching orders",
      error: error.message,
    });
  }
});

// Update order status (admin only)
router.patch("/admin/:id", auth, async (req, res) => {
  try {
    // Check if user is admin
    if (req.user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Not authorized to update order status",
      });
    }

    const { status, trackingNumber, isDelivered } = req.body;

    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    if (status) order.status = status;
    if (trackingNumber) order.trackingNumber = trackingNumber;

    if (isDelivered) {
      order.isDelivered = true;
      order.deliveredAt = Date.now();
    }

    const updatedOrder = await order.save();

    res.json({
      success: true,
      order: updatedOrder,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error updating order status",
      error: error.message,
    });
  }
});

// Cancel order
router.patch("/:id/cancel", auth, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    // Check if order belongs to user or user is admin
    if (
      order.user.toString() !== req.user._id.toString() &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to cancel this order",
      });
    }

    // Only allow cancellation if order is still processing
    if (order.status !== "Processing") {
      return res.status(400).json({
        success: false,
        message: "Order cannot be cancelled at this stage",
      });
    }

    order.status = "Cancelled";

    // Restore product stock
    for (const item of order.items) {
      await Product.findByIdAndUpdate(item.product, {
        $inc: { stock: item.quantity },
      });
    }

    const updatedOrder = await order.save();

    res.json({
      success: true,
      order: updatedOrder,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error cancelling order",
      error: error.message,
    });
  }
});

module.exports = router;
