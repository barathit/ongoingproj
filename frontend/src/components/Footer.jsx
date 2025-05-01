import React from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  IconButton,
  TextField,
  Button,
  Link,
  Divider,
} from "@mui/material";
import {
  Facebook,
  Instagram,
  Twitter,
  Pinterest,
  Email,
  Phone,
  LocationOn,
} from "@mui/icons-material";
import { motion } from "framer-motion";
import { Link as RouterLink } from "react-router-dom";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: "#1A0F0F",
        color: "white",
        py: 6,
        mt: "auto",
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* About Us Section */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>
              About Us
            </Typography>
            <Typography variant="body2" sx={{ mb: 2 }}>
              WeaveNest is your premier destination for authentic handcrafted
              silk sarees, celebrating the rich heritage of Indian weaving
              traditions.
            </Typography>
            <Box sx={{ display: "flex", gap: 1 }}>
              <IconButton
                component={motion.button}
                whileHover={{ scale: 1.1 }}
                color="inherit"
                aria-label="Facebook"
              >
                <Facebook />
              </IconButton>
              <IconButton
                component={motion.button}
                whileHover={{ scale: 1.1 }}
                color="inherit"
                aria-label="Instagram"
              >
                <Instagram />
              </IconButton>
              <IconButton
                component={motion.button}
                whileHover={{ scale: 1.1 }}
                color="inherit"
                aria-label="Twitter"
              >
                <Twitter />
              </IconButton>
              <IconButton
                component={motion.button}
                whileHover={{ scale: 1.1 }}
                color="inherit"
                aria-label="Pinterest"
              >
                <Pinterest />
              </IconButton>
            </Box>
          </Grid>

          {/* Quick Links Section */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>
              Quick Links
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <Link
                component={RouterLink}
                to="/"
                color="inherit"
                underline="hover"
              >
                Home
              </Link>
              <Link
                component={RouterLink}
                to="/shop"
                color="inherit"
                underline="hover"
              >
                Shop
              </Link>
              <Link
                component={RouterLink}
                to="/about"
                color="inherit"
                underline="hover"
              >
                About Us
              </Link>
              <Link
                component={RouterLink}
                to="/contact"
                color="inherit"
                underline="hover"
              >
                Contact
              </Link>
              <Link
                component={RouterLink}
                to="/blog"
                color="inherit"
                underline="hover"
              >
                Blog
              </Link>
            </Box>
          </Grid>

          {/* Contact Info Section */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>
              Contact Info
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <LocationOn />
                <Typography variant="body2">
                  123 Silk Street, Kanchipuram, Tamil Nadu, India
                </Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Phone />
                <Typography variant="body2">+91 98765 43210</Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Email />
                <Typography variant="body2">info@weavenest.com</Typography>
              </Box>
            </Box>
          </Grid>

          {/* Newsletter Section */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>
              Newsletter
            </Typography>
            <Typography variant="body2" sx={{ mb: 2 }}>
              Subscribe to receive updates, access to exclusive deals, and more.
            </Typography>
            <Box
              component="form"
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 1,
              }}
            >
              <TextField
                size="small"
                variant="outlined"
                placeholder="Enter your email"
                sx={{
                  bgcolor: "rgba(255, 255, 255, 0.1)",
                  borderRadius: 1,
                  "& .MuiOutlinedInput-root": {
                    color: "white",
                    "& fieldset": {
                      borderColor: "rgba(255, 255, 255, 0.3)",
                    },
                    "&:hover fieldset": {
                      borderColor: "rgba(255, 255, 255, 0.5)",
                    },
                  },
                }}
              />
              <Button
                variant="contained"
                sx={{
                  bgcolor: "#C6A07C",
                  "&:hover": {
                    bgcolor: "#B08E6A",
                  },
                }}
              >
                Subscribe
              </Button>
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4, bgcolor: "rgba(255, 255, 255, 0.1)" }} />

        {/* Copyright Section */}
        <Typography
          variant="body2"
          align="center"
          sx={{ color: "rgba(255, 255, 255, 0.7)" }}
        >
          © {new Date().getFullYear()} WeaveNest. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
