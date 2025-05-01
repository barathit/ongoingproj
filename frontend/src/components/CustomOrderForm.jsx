import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Snackbar,
  Alert,
} from "@mui/material";
import { motion } from "framer-motion";

const CustomOrderForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    sareeType: "",
    material: "",
    color: "",
    budget: "",
    occasion: "",
    designPreference: "",
    additionalDetails: "",
  });

  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log(formData);
    setOpenSnackbar(true);
    // Reset form
    setFormData({
      name: "",
      email: "",
      phone: "",
      sareeType: "",
      material: "",
      color: "",
      budget: "",
      occasion: "",
      designPreference: "",
      additionalDetails: "",
    });
  };

  return (
    <Box sx={{ py: { xs: 6, md: 12 }, bgcolor: "#faf9f6" }}>
      <Container maxWidth="md">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Typography
            variant="h2"
            align="center"
            sx={{
              mb: 1,
              fontSize: { xs: "2rem", md: "2.5rem" },
              fontWeight: 600,
              fontFamily: "'Playfair Display', serif",
            }}
          >
            Custom Order Request
          </Typography>
          <Typography
            variant="body1"
            align="center"
            sx={{
              mb: 8,
              color: "#666",
              maxWidth: "600px",
              mx: "auto",
              fontSize: "1.1rem",
              lineHeight: 1.8,
            }}
          >
            Let us create your dream saree. Fill out the form below with your
            preferences, and our master weaver will craft a unique piece just
            for you.
          </Typography>

          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
              "& .MuiTextField-root": { mb: 3 },
              "& .MuiFormControl-root": { mb: 3 },
            }}
          >
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
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth required>
                  <InputLabel>Saree Type</InputLabel>
                  <Select
                    name="sareeType"
                    value={formData.sareeType}
                    onChange={handleChange}
                    label="Saree Type"
                  >
                    <MenuItem value="Silk">Silk</MenuItem>
                    <MenuItem value="Cotton">Cotton</MenuItem>
                    <MenuItem value="Linen">Linen</MenuItem>
                    <MenuItem value="Mixed">Mixed</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Preferred Colors"
                  name="color"
                  value={formData.color}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Budget Range"
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth required>
                  <InputLabel>Occasion</InputLabel>
                  <Select
                    name="occasion"
                    value={formData.occasion}
                    onChange={handleChange}
                    label="Occasion"
                  >
                    <MenuItem value="Wedding">Wedding</MenuItem>
                    <MenuItem value="Festival">Festival</MenuItem>
                    <MenuItem value="Party">Party</MenuItem>
                    <MenuItem value="Daily Wear">Daily Wear</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Design Preferences"
                  name="designPreference"
                  value={formData.designPreference}
                  onChange={handleChange}
                  multiline
                  rows={3}
                  placeholder="Describe your preferred design patterns, motifs, or any specific requirements"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Additional Details"
                  name="additionalDetails"
                  value={formData.additionalDetails}
                  onChange={handleChange}
                  multiline
                  rows={4}
                  placeholder="Any additional information or special requests"
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  sx={{
                    bgcolor: "#D5A419",
                    color: "white",
                    py: 2,
                    fontSize: "1.1rem",
                    "&:hover": {
                      bgcolor: "#b88a14",
                    },
                  }}
                >
                  Submit Request
                </Button>
              </Grid>
            </Grid>
          </Box>
        </motion.div>
      </Container>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity="success"
          sx={{ width: "100%" }}
        >
          Your custom order request has been submitted successfully! We'll
          contact you soon.
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default CustomOrderForm;
