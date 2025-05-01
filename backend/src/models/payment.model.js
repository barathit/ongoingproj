const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    order: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      required: true,
    },
    paymentMethod: {
      type: String,
      required: true,
      enum: [
        "credit_card",
        "debit_card",
        "upi",
        "net_banking",
        "wallet",
        "cod",
      ],
    },
    paymentGateway: {
      type: String,
      required: true,
      enum: ["razorpay", "stripe", "paypal", "paytm", "cod"],
    },
    amount: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
      default: "INR",
    },
    status: {
      type: String,
      required: true,
      enum: ["pending", "completed", "failed", "refunded"],
      default: "pending",
    },
    transactionId: {
      type: String,
    },
    gatewayResponse: {
      type: Object,
    },
    refundId: {
      type: String,
    },
    refundAmount: {
      type: Number,
    },
    refundDate: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Payment", paymentSchema);
