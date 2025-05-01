const express = require("express");
const router = express.Router();

const authRoutes = require("./auth.routes");
const userRoutes = require("./user.routes");

// Auth routes
router.use("/auth", authRoutes);

// User routes
router.use("/users", userRoutes);

// Health check route
router.get("/health", (req, res) => {
  res.status(200).json({ status: "OK", message: "Server is healthy" });
});

module.exports = router;
