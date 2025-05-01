const mongoose = require("mongoose");

const customOrderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
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
    sareeType: {
      type: String,
      required: true,
    },
    material: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    budget: {
      type: Number,
      required: true,
    },
    designDescription: {
      type: String,
      required: true,
    },
    referenceImages: [String],
    additionalNotes: String,
    status: {
      type: String,
      enum: ["Pending", "Approved", "In Progress", "Completed", "Rejected"],
      default: "Pending",
    },
    adminNotes: String,
    estimatedDelivery: Date,
    quotedPrice: Number,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("CustomOrder", customOrderSchema);
