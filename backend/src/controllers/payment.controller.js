const Payment = require("../models/payment.model");
const Order = require("../models/order.model");
const Razorpay = require("razorpay");
const crypto = require("crypto");

// Initialize Razorpay
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Create Razorpay order
exports.createRazorpayOrder = async (req, res) => {
  try {
    const { orderId, amount } = req.body;

    // Verify order exists and belongs to user
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    if (order.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to pay for this order",
      });
    }

    // Check if order is already paid
    if (order.isPaid) {
      return res.status(400).json({
        success: false,
        message: "Order is already paid",
      });
    }

    // Create Razorpay order
    const razorpayOrder = await razorpay.orders.create({
      amount: amount * 100, // Razorpay expects amount in paise
      currency: "INR",
      receipt: orderId,
      payment_capture: 1, // Auto capture payment
    });

    // Create payment record in database
    const payment = new Payment({
      user: req.user._id,
      order: orderId,
      paymentMethod: "credit_card", // Default, will be updated after payment
      paymentGateway: "razorpay",
      amount: amount,
      currency: "INR",
      status: "pending",
      transactionId: razorpayOrder.id,
      gatewayResponse: razorpayOrder,
    });

    await payment.save();

    res.json({
      success: true,
      order: razorpayOrder,
      key: process.env.RAZORPAY_KEY_ID,
      payment: payment,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error creating payment",
      error: error.message,
    });
  }
};

// Verify Razorpay payment
exports.verifyRazorpayPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      paymentMethod,
    } = req.body;

    // Find payment by transaction ID
    const payment = await Payment.findOne({ transactionId: razorpay_order_id });
    if (!payment) {
      return res.status(404).json({
        success: false,
        message: "Payment not found",
      });
    }

    // Verify signature
    const generatedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (generatedSignature !== razorpay_signature) {
      payment.status = "failed";
      await payment.save();

      return res.status(400).json({
        success: false,
        message: "Invalid payment signature",
      });
    }

    // Update payment details
    payment.status = "completed";
    payment.transactionId = razorpay_payment_id;
    payment.paymentMethod = paymentMethod || payment.paymentMethod;
    payment.gatewayResponse = {
      ...payment.gatewayResponse,
      razorpay_payment_id,
      razorpay_signature,
    };

    await payment.save();

    // Update order payment status
    const order = await Order.findById(payment.order);
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: razorpay_payment_id,
      status: "completed",
      update_time: Date.now(),
      payment_method: paymentMethod || payment.paymentMethod,
    };

    await order.save();

    res.json({
      success: true,
      message: "Payment verified successfully",
      payment,
      order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error verifying payment",
      error: error.message,
    });
  }
};

// Get payment by ID
exports.getPaymentById = async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id);

    if (!payment) {
      return res.status(404).json({
        success: false,
        message: "Payment not found",
      });
    }

    // Check if payment belongs to user or user is admin
    if (
      payment.user.toString() !== req.user._id.toString() &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to view this payment",
      });
    }

    res.json({
      success: true,
      payment,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching payment",
      error: error.message,
    });
  }
};

// Get all payments for user
exports.getUserPayments = async (req, res) => {
  try {
    const payments = await Payment.find({ user: req.user._id })
      .populate("order", "orderNumber totalPrice")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      payments,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching payments",
      error: error.message,
    });
  }
};

// Process refund
exports.processRefund = async (req, res) => {
  try {
    // Check if user is admin
    if (req.user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Not authorized to process refunds",
      });
    }

    const { paymentId, amount, notes } = req.body;

    const payment = await Payment.findById(paymentId);
    if (!payment) {
      return res.status(404).json({
        success: false,
        message: "Payment not found",
      });
    }

    if (payment.status !== "completed") {
      return res.status(400).json({
        success: false,
        message: "Only completed payments can be refunded",
      });
    }

    // Process refund with Razorpay
    const refund = await razorpay.payments.refund(payment.transactionId, {
      amount: amount * 100, // Convert to paise
      notes: {
        reason: notes || "Customer requested refund",
      },
    });

    // Update payment with refund details
    payment.status = "refunded";
    payment.refundId = refund.id;
    payment.refundAmount = amount;
    payment.refundDate = Date.now();
    payment.gatewayResponse = {
      ...payment.gatewayResponse,
      refund,
    };

    await payment.save();

    // Update order status
    const order = await Order.findById(payment.order);
    order.status = "Refunded";
    await order.save();

    res.json({
      success: true,
      message: "Refund processed successfully",
      payment,
      refund,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error processing refund",
      error: error.message,
    });
  }
};

// Get all payments (admin only)
exports.getAllPayments = async (req, res) => {
  try {
    // Check if user is admin
    if (req.user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Not authorized to view all payments",
      });
    }

    const payments = await Payment.find({})
      .populate("user", "name email")
      .populate("order", "orderNumber totalPrice")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      payments,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching payments",
      error: error.message,
    });
  }
};
