import React from "react";
import { Box, Container, Grid, Typography } from "@mui/material";
import { motion } from "framer-motion";

const WeaverStory = () => {
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
        <Grid
          container
          spacing={{ xs: 4, md: 6, lg: 8 }}
          alignItems="center"
          sx={{ width: "100%", mx: "auto" }}
        >
          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <Box
                sx={{
                  position: "relative",
                  "&::before": {
                    content: '""',
                    position: "absolute",
                    top: { xs: -15, md: -20 },
                    left: { xs: -15, md: -20 },
                    width: { xs: "100px", md: "150px" },
                    height: { xs: "100px", md: "150px" },
                    border: "3px solid #D5A419",
                    zIndex: 1,
                  },
                }}
              >
                <Box
                  component="img"
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgOEgpBHLkt9maDISLZk-cdFtozle4gjBXBQ&s"
                  alt="Master Weaver"
                  sx={{
                    width: "100%",
                    height: {
                      xs: "300px",
                      sm: "400px",
                      md: "500px",
                      lg: "600px",
                    },
                    objectFit: "cover",
                    borderRadius: 2,
                    boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
                    position: "relative",
                    zIndex: 2,
                  }}
                />
              </Box>
            </motion.div>
          </Grid>

          <Grid item xs={12} md={6}>
            <Box sx={{ pl: { md: 4, lg: 6 } }}>
              <motion.div
                initial={{ x: 50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
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
                  OUR LEGACY
                </Typography>
                <Typography
                  variant="h2"
                  sx={{
                    color: "#2C1810",
                    fontWeight: 700,
                    fontSize: {
                      xs: "2rem",
                      sm: "2.5rem",
                      md: "3rem",
                      lg: "3.5rem",
                    },
                    mb: 3,
                    lineHeight: 1.2,
                  }}
                >
                  Crafting Dreams in Every Thread
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    color: "#5C4033",
                    fontSize: { xs: "1rem", md: "1.1rem", lg: "1.2rem" },
                    lineHeight: 1.8,
                    mb: 4,
                  }}
                >
                  For over three generations, our family has been dedicated to
                  preserving and evolving the art of handloom weaving. Each
                  saree we create is a testament to our commitment to quality,
                  tradition, and innovation.
                </Typography>

                <Grid container spacing={3}>
                  {[
                    { number: "30+", text: "Years of Excellence" },
                    { number: "1000+", text: "Unique Designs" },
                    { number: "50+", text: "Master Weavers" },
                    { number: "100%", text: "Handcrafted" },
                  ].map((stat, index) => (
                    <Grid item xs={6} key={index}>
                      <Box
                        sx={{
                          textAlign: "center",
                          p: { xs: 2, md: 3 },
                          borderRadius: 2,
                          bgcolor: "rgba(213, 164, 25, 0.1)",
                          height: "100%",
                        }}
                      >
                        <Typography
                          variant="h3"
                          sx={{
                            color: "#D5A419",
                            fontWeight: 700,
                            fontSize: {
                              xs: "1.8rem",
                              sm: "2rem",
                              md: "2.5rem",
                            },
                            mb: 1,
                          }}
                        >
                          {stat.number}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{
                            color: "#2C1810",
                            fontSize: { xs: "0.9rem", md: "1rem" },
                            fontWeight: 500,
                          }}
                        >
                          {stat.text}
                        </Typography>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </motion.div>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default WeaverStory;
