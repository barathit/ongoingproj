const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const cartController = require("../controllers/cart.controller");

// Get cart for current user
router.get("/", protect, cartController.getCart);

// Add item to cart
router.post("/add", protect, cartController.addToCart);

// Update cart item quantity
router.put("/update/:itemId", protect, cartController.updateCartItem);

// Remove item from cart
router.delete("/remove/:itemId", protect, cartController.removeFromCart);

// Clear cart
router.delete("/clear", protect, cartController.clearCart);

module.exports = router;
