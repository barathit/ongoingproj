import React, { useState } from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  Button,
  IconButton,
  Tabs,
  Tab,
  Rating,
  Chip,
  Divider,
  TextField,
} from "@mui/material";
import { motion } from "framer-motion";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShareIcon from "@mui/icons-material/Share";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import VerifiedUserOutlinedIcon from "@mui/icons-material/VerifiedUserOutlined";
import CachedOutlinedIcon from "@mui/icons-material/CachedOutlined";

const product = {
  id: 1,
  name: "Royal Kanchipuram Silk Saree",
  description:
    "Exquisite handwoven Kanchipuram silk saree featuring traditional temple border and intricate zari work. This masterpiece is crafted by our skilled artisans using pure mulberry silk and real gold zari.",
  price: "₹45,999",
  images: [
    "https://images.pexels.com/photos/9167453/pexels-photo-9167453.jpeg",
    "https://images.pexels.com/photos/9167454/pexels-photo-9167454.jpeg",
    "https://images.pexels.com/photos/9167455/pexels-photo-9167455.jpeg",
  ],
  category: "Wedding Collection",
  material: "Pure Silk",
  specifications: {
    Material: "Pure Kanchipuram Silk",
    Weave: "Handwoven on Traditional Pit Loom",
    Zari: "Pure Gold Zari",
    Border: "Temple Border with Traditional Motifs",
    Blouse: "Unstitched Blouse Piece Included",
    Length: "6.3 meters",
    Care: "Dry Clean Only",
  },
  features: [
    "Authentic Handloom Product",
    "GI Tagged",
    "Pure Mulberry Silk",
    "Traditional Temple Border",
    "Real Gold Zari Work",
    "Unstitched Blouse Piece",
  ],
  rating: 4.8,
  reviews: 124,
};

const ProductDetail = () => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      sx={{
        width: "100%",
        minHeight: "100vh",
        py: { xs: 6, md: 10, lg: 12 },
        bgcolor: "#fff",
      }}
    >
      <Container
        maxWidth={false}
        sx={{
          maxWidth: {
            xs: "100%",
            sm: "540px",
            md: "720px",
            lg: "1140px",
            xl: "1400px",
          },
          mx: "auto",
          px: { xs: 2, sm: 3, md: 4 },
        }}
      >
        <Grid container spacing={{ xs: 4, md: 6, lg: 8 }}>
          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Box
                sx={{
                  position: "relative",
                  width: "100%",
                  borderRadius: 3,
                  overflow: "hidden",
                  boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
                }}
              >
                <Box
                  component="img"
                  src={product.images[selectedImage]}
                  alt={product.name}
                  sx={{
                    width: "100%",
                    height: { xs: 400, sm: 500, md: 600 },
                    objectFit: "cover",
                  }}
                />
              </Box>
              <Grid container spacing={2} sx={{ mt: 2 }}>
                {product.images.map((image, index) => (
                  <Grid item xs={4} key={index}>
                    <Box
                      component="img"
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      onClick={() => setSelectedImage(index)}
                      sx={{
                        width: "100%",
                        height: 100,
                        objectFit: "cover",
                        borderRadius: 2,
                        cursor: "pointer",
                        opacity: selectedImage === index ? 1 : 0.6,
                        transition: "all 0.3s ease",
                        "&:hover": {
                          opacity: 1,
                        },
                      }}
                    />
                  </Grid>
                ))}
              </Grid>
            </motion.div>
          </Grid>

          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Box sx={{ height: "100%" }}>
                <Box sx={{ mb: 2 }}>
                  <Chip
                    label={product.category}
                    size="small"
                    sx={{
                      bgcolor: "rgba(213, 164, 25, 0.1)",
                      color: "#D5A419",
                      mr: 1,
                    }}
                  />
                  <Chip
                    label={product.material}
                    size="small"
                    sx={{
                      bgcolor: "rgba(92, 64, 51, 0.1)",
                      color: "#5C4033",
                    }}
                  />
                </Box>

                <Typography
                  variant="h3"
                  sx={{
                    color: "#2C1810",
                    fontWeight: 700,
                    fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
                    mb: 2,
                  }}
                >
                  {product.name}
                </Typography>

                <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                  <Rating value={product.rating} precision={0.1} readOnly />
                  <Typography variant="body2" sx={{ ml: 1, color: "#5C4033" }}>
                    ({product.reviews} reviews)
                  </Typography>
                </Box>

                <Typography
                  variant="h4"
                  sx={{
                    color: "#D5A419",
                    fontWeight: 700,
                    fontSize: { xs: "1.5rem", md: "2rem" },
                    mb: 3,
                  }}
                >
                  {product.price}
                </Typography>

                <Typography
                  variant="body1"
                  sx={{
                    color: "#5C4033",
                    fontSize: { xs: "1rem", md: "1.1rem" },
                    lineHeight: 1.8,
                    mb: 4,
                  }}
                >
                  {product.description}
                </Typography>

                <Box sx={{ display: "flex", gap: 2, mb: 4 }}>
                  <TextField
                    type="number"
                    value={quantity}
                    onChange={(e) =>
                      setQuantity(Math.max(1, parseInt(e.target.value) || 1))
                    }
                    inputProps={{ min: 1 }}
                    sx={{ width: 100 }}
                  />
                  <Button
                    variant="contained"
                    size="large"
                    sx={{
                      bgcolor: "#D5A419",
                      color: "#fff",
                      px: { xs: 4, md: 6 },
                      py: { xs: 1.5, md: 2 },
                      fontSize: { xs: "1rem", md: "1.1rem" },
                      textTransform: "none",
                      borderRadius: 2,
                      flexGrow: 1,
                      "&:hover": {
                        bgcolor: "#b88a14",
                      },
                    }}
                  >
                    Add to Cart
                  </Button>
                  <IconButton
                    sx={{
                      border: "1px solid #D5A419",
                      color: "#D5A419",
                      "&:hover": {
                        bgcolor: "#D5A419",
                        color: "#fff",
                      },
                    }}
                  >
                    <FavoriteBorderIcon />
                  </IconButton>
                  <IconButton
                    sx={{
                      border: "1px solid #D5A419",
                      color: "#D5A419",
                      "&:hover": {
                        bgcolor: "#D5A419",
                        color: "#fff",
                      },
                    }}
                  >
                    <ShareIcon />
                  </IconButton>
                </Box>

                <Divider sx={{ my: 4 }} />

                <Grid container spacing={3}>
                  {[
                    {
                      icon: <LocalShippingOutlinedIcon />,
                      title: "Free Shipping",
                      text: "On orders above ₹5000",
                    },
                    {
                      icon: <VerifiedUserOutlinedIcon />,
                      title: "Authentic Product",
                      text: "100% Handloom Certified",
                    },
                    {
                      icon: <CachedOutlinedIcon />,
                      title: "Easy Returns",
                      text: "10-day return policy",
                    },
                  ].map((item, index) => (
                    <Grid item xs={12} sm={4} key={index}>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 2,
                        }}
                      >
                        <Box
                          sx={{
                            width: 45,
                            height: 45,
                            borderRadius: "50%",
                            bgcolor: "rgba(213, 164, 25, 0.1)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "#D5A419",
                          }}
                        >
                          {item.icon}
                        </Box>
                        <Box>
                          <Typography
                            variant="subtitle2"
                            sx={{
                              color: "#2C1810",
                              fontWeight: 600,
                              mb: 0.5,
                            }}
                          >
                            {item.title}
                          </Typography>
                          <Typography
                            variant="caption"
                            sx={{ color: "#5C4033" }}
                          >
                            {item.text}
                          </Typography>
                        </Box>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </motion.div>
          </Grid>
        </Grid>

        <Box sx={{ mt: { xs: 6, md: 8 } }}>
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            sx={{
              mb: 4,
              "& .MuiTab-root": {
                color: "#5C4033",
                "&.Mui-selected": {
                  color: "#D5A419",
                },
              },
              "& .MuiTabs-indicator": {
                bgcolor: "#D5A419",
              },
            }}
          >
            <Tab label="Specifications" />
            <Tab label="Features" />
            <Tab label="Reviews" />
          </Tabs>

          <Box
            sx={{ p: { xs: 2, md: 3 }, bgcolor: "#FBF7F4", borderRadius: 3 }}
          >
            {activeTab === 0 && (
              <Grid container spacing={3}>
                {Object.entries(product.specifications).map(([key, value]) => (
                  <Grid item xs={12} sm={6} key={key}>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        p: 2,
                        bgcolor: "#fff",
                        borderRadius: 2,
                      }}
                    >
                      <Typography sx={{ color: "#2C1810", fontWeight: 600 }}>
                        {key}
                      </Typography>
                      <Typography sx={{ color: "#5C4033" }}>{value}</Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            )}

            {activeTab === 1 && (
              <Grid container spacing={2}>
                {product.features.map((feature, index) => (
                  <Grid item xs={12} sm={6} md={4} key={index}>
                    <Box
                      sx={{
                        p: 2,
                        bgcolor: "#fff",
                        borderRadius: 2,
                        display: "flex",
                        alignItems: "center",
                        gap: 2,
                      }}
                    >
                      <Box
                        sx={{
                          width: 8,
                          height: 8,
                          borderRadius: "50%",
                          bgcolor: "#D5A419",
                        }}
                      />
                      <Typography sx={{ color: "#5C4033" }}>
                        {feature}
                      </Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            )}

            {activeTab === 2 && (
              <Typography sx={{ color: "#5C4033", textAlign: "center" }}>
                Reviews coming soon...
              </Typography>
            )}
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default ProductDetail;
