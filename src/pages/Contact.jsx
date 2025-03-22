import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  TextField,
  Button,
  Paper,
  IconButton,
} from "@mui/material";
import { motion } from "framer-motion";
import { Phone, Email, LocationOn, WhatsApp } from "@mui/icons-material";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted:", formData);
  };

  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      sx={{
        py: { xs: 6, md: 10 },
        bgcolor: "#FBF7F4",
        minHeight: "100vh",
      }}
    >
      <Container maxWidth="lg">
        <Typography
          variant="h2"
          component={motion.h1}
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          sx={{
            color: "#2C1810",
            fontWeight: 700,
            mb: 6,
            textAlign: "center",
          }}
        >
          Contact Us
        </Typography>

        <Grid container spacing={4}>
          {/* Contact Information */}
          <Grid item xs={12} md={5}>
            <Paper
              elevation={3}
              sx={{
                p: 4,
                borderRadius: 3,
                height: "100%",
                bgcolor: "#fff",
              }}
            >
              <Typography variant="h5" gutterBottom sx={{ mb: 4 }}>
                Get in Touch
              </Typography>

              <Box sx={{ mb: 4 }}>
                <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                  <IconButton sx={{ mr: 2, bgcolor: "#FBF7F4" }}>
                    <Phone color="primary" />
                  </IconButton>
                  <Box>
                    <Typography variant="subtitle1" fontWeight={600}>
                      Phone
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      +91 98765 43210
                    </Typography>
                  </Box>
                </Box>

                <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                  <IconButton sx={{ mr: 2, bgcolor: "#FBF7F4" }}>
                    <Email color="primary" />
                  </IconButton>
                  <Box>
                    <Typography variant="subtitle1" fontWeight={600}>
                      Email
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      info@sareecommerce.com
                    </Typography>
                  </Box>
                </Box>

                <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                  <IconButton sx={{ mr: 2, bgcolor: "#FBF7F4" }}>
                    <WhatsApp color="primary" />
                  </IconButton>
                  <Box>
                    <Typography variant="subtitle1" fontWeight={600}>
                      WhatsApp
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      +91 98765 43210
                    </Typography>
                  </Box>
                </Box>

                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <IconButton sx={{ mr: 2, bgcolor: "#FBF7F4" }}>
                    <LocationOn color="primary" />
                  </IconButton>
                  <Box>
                    <Typography variant="subtitle1" fontWeight={600}>
                      Address
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      123 Silk Street, Weaver's Colony
                      <br />
                      Kanchipuram, Tamil Nadu 631502
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Paper>
          </Grid>

          {/* Contact Form */}
          <Grid item xs={12} md={7}>
            <Paper
              elevation={3}
              sx={{
                p: 4,
                borderRadius: 3,
                bgcolor: "#fff",
              }}
            >
              <Typography variant="h5" gutterBottom sx={{ mb: 4 }}>
                Send us a Message
              </Typography>

              <form onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Message"
                      name="message"
                      multiline
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      variant="contained"
                      size="large"
                      fullWidth
                      sx={{
                        mt: 2,
                        bgcolor: "#2C1810",
                        "&:hover": {
                          bgcolor: "#1A0F0A",
                        },
                      }}
                    >
                      Send Message
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Contact;
