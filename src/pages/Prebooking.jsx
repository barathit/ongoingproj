import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Button,
  Stepper,
  Step,
  StepLabel,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Chip,
  Divider,
  Paper,
} from "@mui/material";
import { motion } from "framer-motion";
import { AccessTime, Payment, Style } from "@mui/icons-material";

const designs = [
  {
    id: 1,
    name: "Traditional Kanchipuram",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtD_Slu8KFh9Q8M-JGYfDA9iqYOhBnrx1mGg&s",
    basePrice: 45999,
    estimatedDays: 30,
  },
  {
    id: 2,
    name: "Contemporary Banarasi",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtD_Slu8KFh9Q8M-JGYfDA9iqYOhBnrx1mGg&s",
    basePrice: 38999,
    estimatedDays: 25,
  },
  {
    id: 3,
    name: "Designer Patola",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtD_Slu8KFh9Q8M-JGYfDA9iqYOhBnrx1mGg&s",
    basePrice: 52999,
    estimatedDays: 35,
  },
  {
    id: 3,
    name: "Designer Patola",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtD_Slu8KFh9Q8M-JGYfDA9iqYOhBnrx1mGg&s",
    basePrice: 52999,
    estimatedDays: 35,
  },
  {
    id: 3,
    name: "Designer Patola",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtD_Slu8KFh9Q8M-JGYfDA9iqYOhBnrx1mGg&s",
    basePrice: 52999,
    estimatedDays: 35,
  },
  {
    id: 3,
    name: "Designer Patola",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtD_Slu8KFh9Q8M-JGYfDA9iqYOhBnrx1mGg&s",
    basePrice: 52999,
    estimatedDays: 35,
  },
  {
    id: 3,
    name: "Designer Patola",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtD_Slu8KFh9Q8M-JGYfDA9iqYOhBnrx1mGg&s",
    basePrice: 52999,
    estimatedDays: 35,
  },
  {
    id: 3,
    name: "Designer Patola",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtD_Slu8KFh9Q8M-JGYfDA9iqYOhBnrx1mGg&s",
    basePrice: 52999,
    estimatedDays: 35,
  },
];

const customizationOptions = {
  zariType: ["Pure Gold", "Silver", "Copper"],
  borderStyle: ["Temple", "Peacock", "Floral", "Geometric"],
  palluDesign: ["Traditional", "Contemporary", "Minimal"],
  blousePiece: ["Matching", "Contrast", "Plain"],
};

const Prebooking = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [selectedDesign, setSelectedDesign] = useState(null);
  const [customization, setCustomization] = useState({
    zariType: "",
    borderStyle: "",
    palluDesign: "",
    blousePiece: "",
    specialInstructions: "",
  });

  const handleNext = () => {
    setActiveStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  const handleDesignSelect = (design) => {
    setSelectedDesign(design);
    handleNext();
  };

  const handleCustomizationChange = (event) => {
    const { name, value } = event.target;
    setCustomization((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const calculateTotal = () => {
    if (!selectedDesign) return 0;
    let total = selectedDesign.basePrice;
    if (customization.zariType === "Pure Gold") total += 10000;
    return total;
  };

  const steps = ["Select Design", "Customize", "Confirm & Pay"];

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
            mb: 4,
            textAlign: "center",
          }}
        >
          Prebook Your Handcrafted Saree
        </Typography>

        <Stepper activeStep={activeStep} sx={{ mb: 6 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {activeStep === 0 && (
          <Grid container spacing={4}>
            {designs.map((design) => (
              <Grid item xs={12} md={4} key={design.id}>
                <Card
                  component={motion.div}
                  whileHover={{ y: -8 }}
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    cursor: "pointer",
                    boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
                    borderRadius: 3,
                  }}
                  onClick={() => handleDesignSelect(design)}
                >
                  <CardMedia
                    component="img"
                    height="300"
                    image={design.image}
                    alt={design.name}
                  />
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      {design.name}
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Typography variant="h6" color="primary">
                        ₹{design.basePrice.toLocaleString()}
                      </Typography>
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                      >
                        <AccessTime fontSize="small" />
                        <Typography variant="body2">
                          {design.estimatedDays} days
                        </Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}

        {activeStep === 1 && selectedDesign && (
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Paper
                elevation={3}
                sx={{
                  p: 3,
                  borderRadius: 3,
                }}
              >
                <Typography variant="h6" gutterBottom>
                  Customization Options
                </Typography>
                <Grid container spacing={3}>
                  {Object.entries(customizationOptions).map(
                    ([key, options]) => (
                      <Grid item xs={12} key={key}>
                        <FormControl fullWidth>
                          <InputLabel>
                            {key.replace(/([A-Z])/g, " $1").trim()}
                          </InputLabel>
                          <Select
                            name={key}
                            value={customization[key]}
                            onChange={handleCustomizationChange}
                            label={key.replace(/([A-Z])/g, " $1").trim()}
                          >
                            {options.map((option) => (
                              <MenuItem key={option} value={option}>
                                {option}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Grid>
                    )
                  )}
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      multiline
                      rows={4}
                      name="specialInstructions"
                      label="Special Instructions"
                      value={customization.specialInstructions}
                      onChange={handleCustomizationChange}
                    />
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper
                elevation={3}
                sx={{
                  p: 3,
                  borderRadius: 3,
                }}
              >
                <Typography variant="h6" gutterBottom>
                  Selected Design
                </Typography>
                <Box
                  component="img"
                  src={selectedDesign.image}
                  alt={selectedDesign.name}
                  sx={{
                    width: "100%",
                    height: 300,
                    objectFit: "cover",
                    borderRadius: 2,
                    mb: 2,
                  }}
                />
                <Typography variant="h5" gutterBottom>
                  {selectedDesign.name}
                </Typography>
                <Box sx={{ mt: 3 }}>
                  <Typography variant="subtitle1" gutterBottom>
                    Estimated Timeline
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      mb: 2,
                    }}
                  >
                    <AccessTime color="primary" />
                    <Typography>
                      Approximately {selectedDesign.estimatedDays} days
                    </Typography>
                  </Box>
                </Box>
              </Paper>
            </Grid>
            <Grid
              item
              xs={12}
              sx={{ mt: 4, display: "flex", justifyContent: "space-between" }}
            >
              <Button onClick={handleBack}>Back</Button>
              <Button
                variant="contained"
                onClick={handleNext}
                disabled={!Object.values(customization).every(Boolean)}
              >
                Continue to Payment
              </Button>
            </Grid>
          </Grid>
        )}

        {activeStep === 2 && selectedDesign && (
          <Paper
            elevation={3}
            sx={{
              p: 4,
              borderRadius: 3,
              maxWidth: 600,
              mx: "auto",
            }}
          >
            <Typography variant="h5" gutterBottom>
              Order Summary
            </Typography>
            <Box sx={{ my: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      mb: 2,
                    }}
                  >
                    <Typography>Base Price:</Typography>
                    <Typography>
                      ₹{selectedDesign.basePrice.toLocaleString()}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      mb: 2,
                    }}
                  >
                    <Typography>Customization:</Typography>
                    <Typography>
                      ₹
                      {(
                        calculateTotal() - selectedDesign.basePrice
                      ).toLocaleString()}
                    </Typography>
                  </Box>
                  <Divider sx={{ my: 2 }} />
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      mb: 2,
                    }}
                  >
                    <Typography variant="h6">Total:</Typography>
                    <Typography variant="h6">
                      ₹{calculateTotal().toLocaleString()}
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Box>
            <Box
              sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}
            >
              <Button onClick={handleBack}>Back</Button>
              <Button
                variant="contained"
                startIcon={<Payment />}
                onClick={() => {
                  // Handle payment logic
                }}
              >
                Pay Advance (25%)
              </Button>
            </Box>
          </Paper>
        )}
      </Container>
    </Box>
  );
};

export default Prebooking;
