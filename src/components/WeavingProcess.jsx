import React from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  CardMedia,
} from "@mui/material";
import { motion } from "framer-motion";

const processes = [
  {
    title: "Material Selection",
    description:
      "Carefully chosen pure silk and cotton yarns from the finest sources",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRR1HMHk9OWkZn7uaFSLxFfyPhQejkk7-6SDQ&s",
  },
  {
    title: "Design Creation",
    description: "Traditional motifs blended with contemporary patterns",
    image:
      "https://cdn.shopify.com/s/files/1/0353/3897/files/Click_to_add_a_little_bit_of_body_text_1_480x480.png?v=1643099966",
  },
  {
    title: "Handloom Setup",
    description: "Meticulous arrangement of threads on traditional handlooms",
    image:
      "data:image/jpeg;base64,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",
  },
  {
    title: "Weaving Process",
    description: "Skilled artisans weaving each saree with precision and care",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRn0Jr6B_wJ1oKPEb0_6N8EP7-L9ZjjLt6_GA&s",
  },
  {
    title: "Quality Check",
    description: "Thorough inspection ensuring perfection in every detail",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRu-dluZrAKMb49hW4nAEMpPgknBY67iVgNLg&s",
  },
  {
    title: "Final Touches",
    description: "Careful finishing and packaging of each handcrafted piece",
    image:
      "data:image/jpeg;base64,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",
  },
];

const WeavingProcess = () => {
  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      sx={{
        py: { xs: 6, md: 10, lg: 12 },
        bgcolor: "#FBF7F4",
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
            OUR CRAFT
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
            The Art of Handloom Weaving
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
            Discover the intricate journey of creating our handwoven
            masterpieces, where tradition meets innovation at every step.
          </Typography>
        </Box>

        <Grid container spacing={{ xs: 3, sm: 4, md: 5, lg: 6 }}>
          {processes.map((process, index) => (
            <Grid item xs={12} sm={6} lg={4} key={index}>
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
                    transition: "transform 0.3s ease-in-out",
                    "&:hover": {
                      transform: "translateY(-8px)",
                    },
                  }}
                >
                  <CardMedia
                    component="img"
                    image={process.image}
                    alt={process.title}
                    sx={{
                      height: { xs: 200, sm: 240, md: 280, lg: 320 },
                      objectFit: "cover",
                    }}
                  />
                  <CardContent
                    sx={{
                      flexGrow: 1,
                      bgcolor: "#fff",
                      p: { xs: 2, sm: 3 },
                    }}
                  >
                    <Typography
                      variant="h5"
                      sx={{
                        color: "#2C1810",
                        fontWeight: 600,
                        fontSize: { xs: "1.25rem", md: "1.5rem" },
                        mb: 1,
                      }}
                    >
                      {process.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: "#5C4033",
                        fontSize: { xs: "0.9rem", md: "1rem" },
                        lineHeight: 1.6,
                      }}
                    >
                      {process.description}
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

export default WeavingProcess;
