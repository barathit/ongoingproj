const express = require("express");
const router = express.Router();
const paymentController = require("../controllers/payment.controller");
const auth = require("../middleware/auth");

// Create Razorpay order
router.post("/razorpay", auth, paymentController.createRazorpayOrder);

// Verify Razorpay payment
router.post("/razorpay/verify", auth, paymentController.verifyRazorpayPayment);

// Get payment by ID
router.get("/:id", auth, paymentController.getPaymentById);

// Get all payments for user
router.get("/", auth, paymentController.getUserPayments);

// Process refund (admin only)
router.post("/refund", auth, paymentController.processRefund);

// Get all payments (admin only)
router.get("/admin/all", auth, paymentController.getAllPayments);

module.exports = router;
