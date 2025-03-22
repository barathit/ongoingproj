import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  Avatar,
  Paper,
  Rating,
  CircularProgress,
} from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import { FormatQuote } from "@mui/icons-material";
import { useMockServices } from "../mocks/mockServiceProvider";

// Fallback testimonials in case the API fails
const fallbackTestimonials = [
  {
    id: 1,
    name: "Priya Sharma",
    role: "Wedding Collection",
    avatar:
      "https://images.pexels.com/photos/3760854/pexels-photo-3760854.jpeg",
    rating: 5,
    text: "The bridal saree I ordered was absolutely stunning! The craftsmanship and attention to detail exceeded my expectations. Thank you for making my special day even more beautiful.",
  },
  {
    id: 2,
    name: "Anita Patel",
    role: "Custom Design",
    avatar:
      "https://images.pexels.com/photos/3760856/pexels-photo-3760856.jpeg",
    rating: 5,
    text: "The custom saree design process was seamless, and the final product was exactly what I envisioned. The quality of the silk and the weaving is exceptional.",
  },
  {
    id: 3,
    name: "Meera Reddy",
    role: "Festive Collection",
    avatar:
      "https://images.pexels.com/photos/3760858/pexels-photo-3760858.jpeg",
    rating: 5,
    text: "I received so many compliments on my festive saree! The colors are vibrant, and the fabric quality is outstanding. Will definitely order again.",
  },
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [testimonials, setTestimonials] = useState(fallbackTestimonials);
  const [loading, setLoading] = useState(true);

  // Use the hook to get context
  const { getTestimonials } = useMockServices();

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        setLoading(true);
        const response = await getTestimonials();
        if (response.success && response.data.length > 0) {
          setTestimonials(response.data);
        }
      } catch (error) {
        console.error("Error fetching testimonials:", error);
        // Fallback to hardcoded testimonials
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, [getTestimonials]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(timer);
  }, [testimonials.length]);

  if (loading) {
    return (
      <Box
        sx={{
          py: { xs: 8, md: 12 },
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress color="primary" />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        py: { xs: 8, md: 12 },
        bgcolor: "#fff",
        overflow: "hidden",
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
            What Our Customers Say
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
            Hear from our satisfied customers about their experience with our
            handcrafted sarees
          </Typography>
        </Box>

        <Box
          sx={{
            position: "relative",
            height: { xs: 400, md: 300 },
            width: "100%",
          }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              style={{
                position: "absolute",
                width: "100%",
              }}
            >
              <Paper
                elevation={0}
                sx={{
                  p: { xs: 3, md: 6 },
                  borderRadius: 4,
                  bgcolor: "#FBF7F4",
                  position: "relative",
                }}
              >
                <FormatQuote
                  sx={{
                    position: "absolute",
                    top: -20,
                    left: { xs: 20, md: 40 },
                    fontSize: "4rem",
                    color: "#D5A419",
                    opacity: 0.3,
                  }}
                />
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: { xs: "column", md: "row" },
                    alignItems: "center",
                    gap: { xs: 3, md: 6 },
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <Avatar
                      src={
                        testimonials[currentIndex].avatar ||
                        testimonials[currentIndex].image
                      }
                      sx={{
                        width: 100,
                        height: 100,
                        mb: 2,
                        border: "4px solid #fff",
                      }}
                    />
                    <Typography
                      variant="h6"
                      sx={{ color: "#2C1810", fontWeight: 600 }}
                    >
                      {testimonials[currentIndex].name}
                    </Typography>
                    <Typography
                      variant="subtitle2"
                      sx={{ color: "#5C4033", opacity: 0.8, mb: 1 }}
                    >
                      {testimonials[currentIndex].role ||
                        testimonials[currentIndex].location}
                    </Typography>
                    <Rating
                      value={testimonials[currentIndex].rating}
                      readOnly
                      sx={{ color: "#D5A419" }}
                    />
                  </Box>
                  <Typography
                    variant="body1"
                    sx={{
                      color: "#5C4033",
                      fontSize: { xs: "1rem", md: "1.1rem" },
                      fontStyle: "italic",
                      textAlign: { xs: "center", md: "left" },
                      flex: 1,
                    }}
                  >
                    "
                    {testimonials[currentIndex].text ||
                      testimonials[currentIndex].content}
                    "
                  </Typography>
                </Box>
              </Paper>
            </motion.div>
          </AnimatePresence>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: 1,
            mt: 4,
          }}
        >
          {testimonials.map((_, index) => (
            <Box
              key={index}
              component={motion.div}
              animate={{
                scale: currentIndex === index ? 1.2 : 1,
                opacity: currentIndex === index ? 1 : 0.5,
              }}
              sx={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                bgcolor: "#D5A419",
                cursor: "pointer",
              }}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default Testimonials;
