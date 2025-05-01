import React from "react";
import { Container, Typography, Grid, Box, Paper } from "@mui/material";
import {
  LocalShipping,
  Security,
  MonetizationOn,
  Support,
} from "@mui/icons-material";

const About = () => {
  const features = [
    {
      icon: <LocalShipping sx={{ fontSize: 40, color: "#088178" }} />,
      title: "Free Shipping",
      description: "Free shipping on all orders over $50",
    },
    {
      icon: <Security sx={{ fontSize: 40, color: "#088178" }} />,
      title: "Secure Payment",
      description: "Safe & secure payment methods",
    },
    {
      icon: <MonetizationOn sx={{ fontSize: 40, color: "#088178" }} />,
      title: "Money Back",
      description: "30 days money back guarantee",
    },
    {
      icon: <Support sx={{ fontSize: 40, color: "#088178" }} />,
      title: "24/7 Support",
      description: "Dedicated support team",
    },
  ];

  return (
    <Container sx={{ py: 8 }}>
      <Typography variant="h3" component="h1" align="center" gutterBottom>
        About Us
      </Typography>
      <Typography
        variant="h6"
        align="center"
        color="text.secondary"
        paragraph
        sx={{ mb: 6 }}
      >
        We are dedicated to providing the best fashion experience for our
        customers
      </Typography>

      <Grid container spacing={4} sx={{ mb: 8 }}>
        {features.map((feature, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Paper
              elevation={0}
              sx={{
                p: 3,
                textAlign: "center",
                backgroundColor: "transparent",
                "&:hover": {
                  transform: "translateY(-5px)",
                  transition: "transform 0.3s ease",
                },
              }}
            >
              <Box sx={{ mb: 2 }}>{feature.icon}</Box>
              <Typography variant="h6" gutterBottom>
                {feature.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {feature.description}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Typography variant="h4" gutterBottom>
            Our Story
          </Typography>
          <Typography paragraph>
            Founded in 2024, our fashion store has been at the forefront of
            style and innovation. We believe in providing high-quality fashion
            that not only looks good but feels good too.
          </Typography>
          <Typography paragraph>
            Our commitment to sustainable fashion and ethical practices sets us
            apart in the industry. We work directly with manufacturers to ensure
            fair labor practices and use of eco-friendly materials.
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h4" gutterBottom>
            Our Mission
          </Typography>
          <Typography paragraph>
            To provide accessible, high-quality fashion while maintaining
            sustainable and ethical practices. We strive to make fashion more
            inclusive and environmentally conscious.
          </Typography>
          <Typography paragraph>
            We're committed to reducing our environmental impact and promoting
            sustainable fashion choices through innovative designs and
            responsible manufacturing processes.
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
};

export default About;
