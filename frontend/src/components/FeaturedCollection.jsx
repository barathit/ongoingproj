import React from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  CardMedia,
  IconButton,
} from "@mui/material";
import { motion } from "framer-motion";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";

const featuredProducts = [
  {
    id: 1,
    name: "Royal Kanchipuram Silk",
    description: "Traditional bridal silk saree with pure zari work",
    price: "₹45,999",
    image:
      "data:image/jpeg;base64,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",
    category: "Wedding Collection",
  },
  {
    id: 2,
    name: "Mysore Pure Silk",
    description: "Elegant pure silk saree with temple border",
    price: "₹28,999",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdO1xZF69bE8joxIfu1bI9dJcDLqvk6CQ8XA&s",
    category: "Silk Sarees",
  },
  {
    id: 3,
    name: "Banarasi Silk",
    description: "Handwoven Banarasi silk with intricate motifs",
    price: "₹35,999",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYzUE_i7wwkIh7ttdMNAaZPbdFdSV9P6_4NQ&s",
    category: "Festive Collection",
  },
  {
    id: 4,
    name: "Cotton Handloom",
    description: "Lightweight cotton saree with contemporary design",
    price: "₹4,999",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYzUE_i7wwkIh7ttdMNAaZPbdFdSV9P6_4NQ&s",
    category: "Daily Wear",
  },
  {
    id: 4,
    name: "Cotton Handloom",
    description: "Lightweight cotton saree with contemporary design",
    price: "₹4,999",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYzUE_i7wwkIh7ttdMNAaZPbdFdSV9P6_4NQ&s",
    category: "Daily Wear",
  },
  {
    id: 4,
    name: "Cotton Handloom",
    description: "Lightweight cotton saree with contemporary design",
    price: "₹4,999",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYzUE_i7wwkIh7ttdMNAaZPbdFdSV9P6_4NQ&s",
    category: "Daily Wear",
  },
  {
    id: 4,
    name: "Cotton Handloom",
    description: "Lightweight cotton saree with contemporary design",
    price: "₹4,999",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYzUE_i7wwkIh7ttdMNAaZPbdFdSV9P6_4NQ&s",
    category: "Daily Wear",
  },
  {
    id: 4,
    name: "Cotton Handloom",
    description: "Lightweight cotton saree with contemporary design",
    price: "₹4,999",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYzUE_i7wwkIh7ttdMNAaZPbdFdSV9P6_4NQ&s",
    category: "Daily Wear",
  },
  {
    id: 4,
    name: "Cotton Handloom",
    description: "Lightweight cotton saree with contemporary design",
    price: "₹4,999",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYzUE_i7wwkIh7ttdMNAaZPbdFdSV9P6_4NQ&s",
    category: "Daily Wear",
  },
  {
    id: 4,
    name: "Cotton Handloom",
    description: "Lightweight cotton saree with contemporary design",
    price: "₹4,999",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYzUE_i7wwkIh7ttdMNAaZPbdFdSV9P6_4NQ&s",
    category: "Daily Wear",
  },
];

const FeaturedCollection = () => {
  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      sx={{
        py: { xs: 6, md: 10, lg: 12 },
        bgcolor: "#fff",
        width: "100%",
        overflow: "hidden",
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
        <Box sx={{ textAlign: "center", mb: { xs: 6, md: 8, lg: 10 } }}>
          <Typography
            variant="overline"
            sx={{
              color: "#D5A419",
              fontSize: { xs: "0.9rem", md: "1rem" },
              letterSpacing: "0.2em",
              mb: 2,
              display: "block",
            }}
          >
            FEATURED COLLECTION
          </Typography>
          <Typography
            variant="h2"
            sx={{
              color: "#2C1810",
              fontWeight: 700,
              fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem", lg: "3.5rem" },
              mb: 3,
              lineHeight: 1.2,
            }}
          >
            Handpicked Masterpieces
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: "#5C4033",
              fontSize: { xs: "1rem", md: "1.1rem", lg: "1.2rem" },
              maxWidth: "800px",
              mx: "auto",
              lineHeight: 1.8,
            }}
          >
            Discover our curated collection of exquisite handloom sarees, each
            piece telling a unique story of tradition and craftsmanship.
          </Typography>
        </Box>

        <Grid container spacing={{ xs: 3, sm: 4, md: 5, lg: 6 }}>
          {featuredProducts.map((product, index) => (
            <Grid item xs={12} sm={6} lg={3} key={product.id}>
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    borderRadius: 3,
                    overflow: "hidden",
                    boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
                    transition: "all 0.3s ease-in-out",
                    "&:hover": {
                      transform: "translateY(-8px)",
                      "& .product-actions": {
                        opacity: 1,
                      },
                      "& .product-image": {
                        transform: "scale(1.1)",
                      },
                    },
                  }}
                >
                  <Box sx={{ position: "relative", overflow: "hidden" }}>
                    <CardMedia
                      component="img"
                      image={product.image}
                      alt={product.name}
                      className="product-image"
                      sx={{
                        height: { xs: 300, sm: 350, md: 400, lg: 450 },
                        objectFit: "cover",
                        transition: "transform 0.6s ease-in-out",
                      }}
                    />
                    <Box
                      className="product-actions"
                      sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        display: "flex",
                        gap: 1,
                        opacity: 0,
                        transition: "opacity 0.3s ease-in-out",
                      }}
                    >
                      {[
                        <VisibilityOutlinedIcon />,
                        <ShoppingCartOutlinedIcon />,
                        <FavoriteBorderIcon />,
                      ].map((icon, i) => (
                        <IconButton
                          key={i}
                          sx={{
                            bgcolor: "rgba(255,255,255,0.9)",
                            "&:hover": {
                              bgcolor: "#D5A419",
                              color: "#fff",
                            },
                          }}
                        >
                          {icon}
                        </IconButton>
                      ))}
                    </Box>
                  </Box>
                  <CardContent
                    sx={{
                      flexGrow: 1,
                      bgcolor: "#fff",
                      p: { xs: 2, sm: 3 },
                    }}
                  >
                    <Typography
                      variant="overline"
                      sx={{
                        color: "#D5A419",
                        fontSize: "0.75rem",
                        mb: 1,
                        display: "block",
                      }}
                    >
                      {product.category}
                    </Typography>
                    <Typography
                      variant="h6"
                      sx={{
                        color: "#2C1810",
                        fontWeight: 600,
                        fontSize: { xs: "1.1rem", md: "1.25rem" },
                        mb: 1,
                      }}
                    >
                      {product.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: "#5C4033",
                        fontSize: { xs: "0.875rem", md: "0.9rem" },
                        mb: 2,
                        lineHeight: 1.6,
                      }}
                    >
                      {product.description}
                    </Typography>
                    <Typography
                      variant="h6"
                      sx={{
                        color: "#D5A419",
                        fontWeight: 700,
                        fontSize: { xs: "1.1rem", md: "1.25rem" },
                      }}
                    >
                      {product.price}
                    </Typography>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default FeaturedCollection;
