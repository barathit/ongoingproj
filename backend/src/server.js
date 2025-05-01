const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const dotenv = require("dotenv");

// Load environment variables
dotenv.config();

// Import routes
const userRoutes = require("./routes/user.routes");
const productRoutes = require("./routes/product.routes");
const cartRoutes = require("./routes/cart.routes");
const orderRoutes = require("./routes/order.routes");
const customOrderRoutes = require("./routes/customOrder.routes");
const prebookRoutes = require("./routes/prebook.routes");

// Initialize express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static folder for uploads
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

// Create uploads directories if they don't exist
const fs = require("fs");
const uploadDirs = [
  path.join(__dirname, "../uploads"),
  path.join(__dirname, "../uploads/products"),
  path.join(__dirname, "../uploads/custom-orders"),
];

uploadDirs.forEach((dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI || "mongodb://localhost:27017/weavenest")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Connection Error:", err));

// Routes
app.use("/api/users", userRoutes);
app.use("/api/auth", userRoutes); // Add this line to create an alias for auth routes
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/custom-orders", customOrderRoutes);
app.use("/api/prebook", prebookRoutes);

// Serve static assets in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../../frontend/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../../frontend/build", "index.html"));
  });
}

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: "Server Error",
    error: process.env.NODE_ENV === "development" ? err.message : undefined,
  });
});

// Start server
const PORT = process.env.PORT || 5000;
const server = app
  .listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  })
  .on("error", (err) => {
    if (err.code === "EADDRINUSE") {
      // If port 5000 is in use, try port 5001
      const newPort = PORT + 1;
      console.log(`Port ${PORT} is in use, trying port ${newPort}...`);
      server.close();
      app.listen(newPort, () => {
        console.log(`Server running on port ${newPort}`);
      });
    } else {
      console.error("Server error:", err);
    }
  });
