const mongoose = require("mongoose");

const prebookSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      default: 1,
      min: 1,
    },
    advanceAmount: {
      type: Number,
      required: true,
    },
    paymentStatus: {
      type: String,
      enum: ["Pending", "Paid", "Refunded"],
      default: "Pending",
    },
    paymentId: String,
    expectedDeliveryDate: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: [
        "Pending",
        "Confirmed",
        "In Production",
        "Ready",
        "Delivered",
        "Cancelled",
      ],
      default: "Pending",
    },
    notes: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Prebook", prebookSchema);
