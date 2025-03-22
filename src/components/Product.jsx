import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box,
  IconButton,
  Chip,
  Rating,
  Tooltip,
} from "@mui/material";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import VisibilityIcon from "@mui/icons-material/Visibility";

const Product = ({ product, onQuickView }) => {
  const [isWishlisted, setIsWishlisted] = useState(false);

  const handleAddToCart = (e) => {
    e.stopPropagation();
    // For now, just show a toast message
    toast.success(`${product.name} added to cart!`);
  };

  const handleToggleWishlist = (e) => {
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
    toast.success(
      isWishlisted
        ? `${product.name} removed from wishlist!`
        : `${product.name} added to wishlist!`
    );
  };

  const calculateDiscount = () => {
    if (!product.discountPrice) return null;
    const discount = Math.round(
      ((product.price - product.discountPrice) / product.price) * 100
    );
    return discount > 0 ? discount : null;
  };

  const discount = calculateDiscount();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          position: "relative",
          "&:hover": {
            boxShadow: 6,
            transform: "scale(1.02)",
            transition: "all 0.3s ease-in-out",
          },
        }}
      >
        {/* Product Badge */}
        <Box sx={{ position: "absolute", top: 10, left: 10, zIndex: 1 }}>
          {product.isNew && (
            <Chip
              label="New"
              color="primary"
              size="small"
              sx={{ mb: 0.5, fontSize: "0.7rem", fontWeight: "bold" }}
            />
          )}
          {product.isTrending && (
            <Box sx={{ mt: 0.5 }}>
              <Chip
                label="Trending"
                color="secondary"
                size="small"
                sx={{ fontSize: "0.7rem", fontWeight: "bold" }}
              />
            </Box>
          )}
          {product.limitedStock && (
            <Box sx={{ mt: 0.5 }}>
              <Chip
                label="Limited Stock"
                color="error"
                size="small"
                sx={{ fontSize: "0.7rem", fontWeight: "bold" }}
              />
            </Box>
          )}
        </Box>

        {/* Discount Badge */}
        {discount && (
          <Chip
            label={`-${discount}%`}
            color="error"
            size="small"
            sx={{
              position: "absolute",
              top: 10,
              right: 10,
              zIndex: 1,
              fontWeight: "bold",
            }}
          />
        )}

        <Link to={`/product/${product._id}`} style={{ textDecoration: "none" }}>
          <CardMedia
            component="img"
            height="220"
            image={product.images ? product.images[0] : product.image}
            alt={product.name}
            sx={{ objectFit: "cover" }}
          />
        </Link>

        {/* Wishlist & Quick View */}
        <Box sx={{ position: "absolute", top: 180, right: 10, zIndex: 1 }}>
          <Tooltip
            title={isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
          >
            <IconButton
              size="small"
              onClick={handleToggleWishlist}
              sx={{
                bgcolor: "white",
                mb: 1,
                "&:hover": { bgcolor: "#f5f5f5" },
              }}
            >
              {isWishlisted ? (
                <FavoriteIcon color="error" fontSize="small" />
              ) : (
                <FavoriteBorderIcon fontSize="small" />
              )}
            </IconButton>
          </Tooltip>
          <br />
          <Tooltip title="Quick View">
            <IconButton
              size="small"
              onClick={(e) => {
                e.stopPropagation();
                onQuickView && onQuickView(product);
              }}
              sx={{
                bgcolor: "white",
                "&:hover": { bgcolor: "#f5f5f5" },
              }}
            >
              <VisibilityIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>

        <CardContent sx={{ flexGrow: 1 }}>
          <Typography gutterBottom variant="h6" component="h2" noWrap>
            {product.name}
          </Typography>

          {/* Category if available */}
          {product.category && (
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ mb: 1, fontSize: "0.8rem" }}
            >
              {product.category}
            </Typography>
          )}

          {/* Rating if available */}
          {product.rating && (
            <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
              <Rating
                value={product.rating}
                readOnly
                size="small"
                precision={0.5}
              />
              {product.reviewCount && (
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ ml: 0.5 }}
                >
                  ({product.reviewCount})
                </Typography>
              )}
            </Box>
          )}

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mt: 1,
            }}
          >
            <Typography variant="h6" color="primary">
              ₹{product.discountPrice || product.price}
              {product.discountPrice && (
                <Typography
                  component="span"
                  sx={{
                    textDecoration: "line-through",
                    color: "text.secondary",
                    ml: 1,
                    fontSize: "0.8em",
                  }}
                >
                  ₹{product.price}
                </Typography>
              )}
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddToCart}
              size="small"
            >
              Add to Cart
            </Button>
          </Box>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default Product;
