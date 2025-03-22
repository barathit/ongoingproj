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
  Paper,
} from "@mui/material";
import { motion } from "framer-motion";

const fabricTypes = [
  "Pure Silk",
  "Cotton Silk",
  "Linen",
  "Organza",
  "Georgette",
  "Banarasi Silk",
];

const occasions = [
  "Wedding",
  "Festival",
  "Party Wear",
  "Daily Wear",
  "Office Wear",
  "Other",
];

const CustomOrder = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    fabricType: "",
    occasion: "",
    color: "",
    budget: "",
    designPreference: "",
    measurements: "",
    additionalNotes: "",
  });

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
        <Box sx={{ textAlign: "center", mb: 6 }}>
          <Typography
            component={motion.h1}
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            variant="h2"
            sx={{
              color: "#2C1810",
              fontWeight: 700,
              mb: 2,
            }}
          >
            Custom Order
          </Typography>
          <Typography
            component={motion.p}
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            variant="h6"
            sx={{ color: "#5C4033", maxWidth: 600, mx: "auto" }}
          >
            Create your dream saree with our expert weavers. Fill out the form
            below and we'll bring your vision to life.
          </Typography>
        </Box>

        <Paper
          component={motion.form}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          elevation={3}
          onSubmit={handleSubmit}
          sx={{
            p: { xs: 3, md: 6 },
            borderRadius: 3,
            bgcolor: "#fff",
            maxWidth: 900,
            mx: "auto",
          }}
        >
          <Grid container spacing={3}>
            {/* Personal Information */}
            <Grid item xs={12}>
              <Typography
                variant="h6"
                sx={{ color: "#2C1810", mb: 2, fontWeight: 600 }}
              >
                Personal Information
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Full Name"
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
                label="Phone Number"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </Grid>

            {/* Saree Preferences */}
            <Grid item xs={12}>
              <Typography
                variant="h6"
                sx={{ color: "#2C1810", mb: 2, mt: 2, fontWeight: 600 }}
              >
                Saree Preferences
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth required>
                <InputLabel>Fabric Type</InputLabel>
                <Select
                  name="fabricType"
                  value={formData.fabricType}
                  onChange={handleChange}
                  label="Fabric Type"
                >
                  {fabricTypes.map((fabric) => (
                    <MenuItem key={fabric} value={fabric}>
                      {fabric}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth required>
                <InputLabel>Occasion</InputLabel>
                <Select
                  name="occasion"
                  value={formData.occasion}
                  onChange={handleChange}
                  label="Occasion"
                >
                  {occasions.map((occasion) => (
                    <MenuItem key={occasion} value={occasion}>
                      {occasion}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Color Preference"
                name="color"
                value={formData.color}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Budget Range (₹)"
                name="budget"
                value={formData.budget}
                onChange={handleChange}
                required
              />
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
                label="Measurements"
                name="measurements"
                value={formData.measurements}
                onChange={handleChange}
                multiline
                rows={2}
                placeholder="Please provide any specific measurements or size requirements"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Additional Notes"
                name="additionalNotes"
                value={formData.additionalNotes}
                onChange={handleChange}
                multiline
                rows={3}
                placeholder="Any additional information or special requests"
              />
            </Grid>

            {/* Submit Button */}
            <Grid item xs={12}>
              <Button
                component={motion.button}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                variant="contained"
                size="large"
                fullWidth
                sx={{
                  mt: 2,
                  bgcolor: "#D5A419",
                  color: "#fff",
                  py: 1.5,
                  fontSize: "1.1rem",
                  textTransform: "none",
                  "&:hover": {
                    bgcolor: "#b88a14",
                  },
                }}
              >
                Submit Custom Order Request
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Box>
  );
};

export default CustomOrder;
