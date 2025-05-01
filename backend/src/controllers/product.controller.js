const Product = require("../models/product.model");

// Get all products
exports.getProducts = async (req, res) => {
  try {
    const { category, search, sort, page = 1, limit = 10 } = req.query;

    // Build query
    const query = {};

    if (category) {
      query.category = category;
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    // Build sort options
    let sortOptions = {};
    if (sort) {
      switch (sort) {
        case "price-asc":
          sortOptions = { price: 1 };
          break;
        case "price-desc":
          sortOptions = { price: -1 };
          break;
        case "newest":
          sortOptions = { createdAt: -1 };
          break;
        case "rating":
          sortOptions = { ratings: -1 };
          break;
        default:
          sortOptions = { createdAt: -1 };
      }
    } else {
      sortOptions = { createdAt: -1 };
    }

    // Pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);

    // Execute query
    const products = await Product.find(query)
      .sort(sortOptions)
      .skip(skip)
      .limit(parseInt(limit));

    // Get total count for pagination
    const total = await Product.countDocuments(query);

    res.json({
      success: true,
      products,
      pagination: {
        total,
        page: parseInt(page),
        pages: Math.ceil(total / parseInt(limit)),
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching products",
      error: error.message,
    });
  }
};

// Get single product
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.json({
      success: true,
      product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching product",
      error: error.message,
    });
  }
};

// Create product (admin only)
exports.createProduct = async (req, res) => {
  try {
    // Check if user is admin
    if (req.user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Not authorized to create products",
      });
    }

    // Get image paths
    const imagePaths = req.files.map(
      (file) => `/uploads/products/${file.filename}`
    );

    const product = new Product({
      ...req.body,
      images: imagePaths,
    });

    await product.save();

    res.status(201).json({
      success: true,
      product,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error creating product",
      error: error.message,
    });
  }
};

// Update product (admin only)
exports.updateProduct = async (req, res) => {
  try {
    // Check if user is admin
    if (req.user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Not authorized to update products",
      });
    }

    const updates = { ...req.body };

    // Add new images if uploaded
    if (req.files && req.files.length > 0) {
      const imagePaths = req.files.map(
        (file) => `/uploads/products/${file.filename}`
      );

      // If keepExistingImages is true, append new images
      if (req.body.keepExistingImages === "true") {
        const product = await Product.findById(req.params.id);
        updates.images = [...product.images, ...imagePaths];
      } else {
        updates.images = imagePaths;
      }
    }

    const product = await Product.findByIdAndUpdate(req.params.id, updates, {
      new: true,
      runValidators: true,
    });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.json({
      success: true,
      product,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error updating product",
      error: error.message,
    });
  }
};

// Delete product (admin only)
exports.deleteProduct = async (req, res) => {
  try {
    // Check if user is admin
    if (req.user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Not authorized to delete products",
      });
    }

    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting product",
      error: error.message,
    });
  }
};

// Add product review
exports.createProductReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;

    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // Check if user already reviewed
    const alreadyReviewed = product.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    );

    if (alreadyReviewed) {
      return res.status(400).json({
        success: false,
        message: "Product already reviewed",
      });
    }

    const review = {
      user: req.user._id,
      name: req.user.name,
      rating: Number(rating),
      comment,
    };

    product.reviews.push(review);
    product.numReviews = product.reviews.length;

    // Calculate average rating
    product.ratings =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length;

    await product.save();

    res.status(201).json({
      success: true,
      message: "Review added",
      product,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error adding review",
      error: error.message,
    });
  }
};
