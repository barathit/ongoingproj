const express = require("express");
const router = express.Router();
const { protect, admin } = require("../middleware/authMiddleware");
const userController = require("../controllers/user.controller");

// Auth routes
router.post("/register", userController.registerUser);
router.post("/login", userController.loginUser);
router.post("/forgot-password", userController.forgotPassword);
router.post("/reset-password/:token", userController.resetPassword);

// User routes (protected)
router.get("/profile", protect, userController.getUserProfile);
router.put("/profile", protect, userController.updateUserProfile);

// Admin routes
router.get("/", protect, admin, userController.getAllUsers);
router.get("/:id", protect, admin, userController.getUserById);
router.put("/:id", protect, admin, userController.updateUser);
router.delete("/:id", protect, admin, userController.deleteUser);

module.exports = router;
