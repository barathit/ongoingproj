import React from "react";
import { Box, Container, Grid, Typography, Paper } from "@mui/material";
import { motion } from "framer-motion";
import {
  Handshake,
  Palette,
  LocalShipping,
  Security,
  VerifiedUser,
  AttachMoney,
} from "@mui/icons-material";

const features = [
  {
    icon: <Handshake sx={{ fontSize: 40 }} />,
    title: "100% Handwoven Sarees",
    description: "Each saree is carefully handcrafted by skilled artisans",
  },
  {
    icon: <Palette sx={{ fontSize: 40 }} />,
    title: "Customization Available",
    description: "Design your dream saree with our expert weavers",
  },
  {
    icon: <AttachMoney sx={{ fontSize: 40 }} />,
    title: "Best Prices",
    description: "Direct from weavers - no middleman markup",
  },
  {
    icon: <LocalShipping sx={{ fontSize: 40 }} />,
    title: "Fast Delivery",
    description: "Quick and secure shipping worldwide",
  },
  {
    icon: <Security sx={{ fontSize: 40 }} />,
    title: "Secure Payments",
    description: "Multiple secure payment options available",
  },
  {
    icon: <VerifiedUser sx={{ fontSize: 40 }} />,
    title: "Quality Assured",
    description: "Rigorous quality checks at every stage",
  },
];

const WhyChooseUs = () => {
  return (
    <Box
      sx={{
        py: { xs: 8, md: 12 },
        bgcolor: "#FBF7F4",
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ textAlign: "center", mb: 8 }}>
          <Typography
            component={motion.h2}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            variant="h2"
            sx={{
              color: "#2C1810",
              fontWeight: 700,
              mb: 2,
              fontSize: { xs: "2rem", md: "2.5rem" },
            }}
          >
            Why Choose Us?
          </Typography>
          <Typography
            component={motion.p}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            variant="h6"
            sx={{
              color: "#5C4033",
              maxWidth: "800px",
              mx: "auto",
              opacity: 0.8,
            }}
          >
            Experience the finest handwoven sarees with our commitment to
            quality and authenticity
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Paper
                  elevation={0}
                  sx={{
                    p: 4,
                    height: "100%",
                    bgcolor: "white",
                    borderRadius: 4,
                    transition: "transform 0.3s ease-in-out",
                    "&:hover": {
                      transform: "translateY(-8px)",
                      boxShadow: "0 10px 40px -10px rgba(0,0,0,0.1)",
                    },
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      textAlign: "center",
                    }}
                  >
                    <Box
                      sx={{
                        mb: 3,
                        p: 2,
                        borderRadius: "50%",
                        bgcolor: "#FBF7F4",
                        color: "#D5A419",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {feature.icon}
                    </Box>
                    <Typography
                      variant="h6"
                      sx={{
                        mb: 1,
                        color: "#2C1810",
                        fontWeight: 600,
                      }}
                    >
                      {feature.title}
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        color: "#5C4033",
                        opacity: 0.8,
                      }}
                    >
                      {feature.description}
                    </Typography>
                  </Box>
                </Paper>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default WhyChooseUs;
