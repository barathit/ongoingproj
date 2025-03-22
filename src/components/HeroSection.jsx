/* eslint-disable react/jsx-no-undef */
import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowForward } from "@mui/icons-material";

const heroImages = [
  {
    url: "https://i.pinimg.com/474x/19/3a/f6/193af67bc09f9b98df2f36a728f888bf.jpg",
    title: "Handcrafted Elegance",
    subtitle: "Traditional Silk Sarees",
  },
  {
    url: "https://i.pinimg.com/474x/36/16/41/361641323e2f73d26e6b3d7c2a25f050.jpg",
    title: "Contemporary Grace",
    subtitle: "Designer Collection",
  },
  {
    url: "https://i.pinimg.com/474x/65/17/9c/65179c096ef1c2e666426b01b191e3a9.jpg",
    title: "Timeless Beauty",
    subtitle: "Wedding Collection",
  },
];

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();
  const theme = useTheme();
  // Keep isMobile even though unused for future responsive design needs
  // eslint-disable-next-line no-unused-vars
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    const timer = setInterval(() => {
      if (!isHovered) {
        setCurrentSlide((prev) => (prev + 1) % heroImages.length);
      }
    }, 5000);

    return () => clearInterval(timer);
  }, [isHovered]);

  const slideVariants = {
    enter: {
      opacity: 0,
      scale: 1.2,
    },
    center: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 1,
        ease: "easeOut",
      },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      transition: {
        duration: 0.5,
        ease: "easeIn",
      },
    },
  };

  return (
    <Box
      sx={{
        position: "relative",
        height: {
          xs: "calc(100vh - 56px)",
          sm: "calc(100vh - 64px)",
          md: "90vh",
        },
        overflow: "hidden",
        backgroundColor: "#000",
        mt: 0,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundImage: `url(${heroImages[currentSlide].url})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              transition: "transform 0.8s ease",
              "&:hover": {
                transform: "scale(1.05)",
              },
              "&::before": {
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                background:
                  "linear-gradient(45deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 100%)",
                opacity: 0.7,
              },
            }}
          />
        </motion.div>
      </AnimatePresence>

      <Container
        maxWidth="xl"
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: { xs: "flex-start", md: "center" },
          position: "relative",
          zIndex: 2,
          pt: { xs: 4, md: 0 },
        }}
      >
        <Box
          sx={{
            maxWidth: { xs: "100%", md: "60%" },
            color: "white",
            textAlign: { xs: "center", md: "left" },
            px: { xs: 2, md: 0 },
            mt: { xs: 4, md: 0 },
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Typography
              variant="overline"
              sx={{
                color: "#D5A419",
                letterSpacing: "4px",
                fontSize: { xs: "0.7rem", sm: "0.8rem", md: "1rem" },
                mb: { xs: 1, md: 2 },
                display: "block",
                textTransform: "uppercase",
                fontWeight: 600,
              }}
            >
              {heroImages[currentSlide].subtitle}
            </Typography>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: "2rem", sm: "3rem", md: "4.5rem" },
                fontWeight: 700,
                mb: { xs: 2, md: 3 },
                lineHeight: { xs: 1.1, md: 1.2 },
                textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
                background: "linear-gradient(45deg, #FFFFFF 30%, #D5A419 90%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              {heroImages[currentSlide].title}
            </Typography>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <Typography
              variant="h6"
              sx={{
                fontSize: { xs: "0.9rem", sm: "1rem", md: "1.2rem" },
                mb: { xs: 3, md: 4 },
                maxWidth: "600px",
                opacity: 0.9,
                lineHeight: { xs: 1.6, md: 1.8 },
                mx: { xs: "auto", md: 0 },
              }}
            >
              Discover our exquisite collection of handcrafted sarees, where
              tradition meets contemporary design. Each piece tells a unique
              story of artistry and elegance.
            </Typography>
          </motion.div>
        </Box>

        {/* Centered Explore Button */}
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: { xs: "center", md: "flex-end" },
            mt: { xs: 2, md: 6 },
            pr: { xs: 0, md: 12 },
            position: { xs: "relative", md: "absolute" },
            bottom: { xs: "auto", md: "140px" },
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              variant="contained"
              size="large"
              endIcon={<ArrowForward sx={{ fontSize: { xs: 18, md: 20 } }} />}
              onClick={() => navigate("/shop")}
              sx={{
                backgroundColor: "#D5A419",
                color: "white",
                px: { xs: 3, sm: 4, md: 5 },
                py: { xs: 1.25, sm: 1.5, md: 1.75 },
                fontSize: { xs: "0.9rem", sm: "1rem", md: "1.1rem" },
                borderRadius: "30px",
                textTransform: "none",
                minWidth: { xs: "180px", sm: "200px", md: "220px" },
                height: { xs: "44px", sm: "48px", md: "52px" },
                "&:hover": {
                  backgroundColor: "#b88a14",
                  transform: "translateY(-2px)",
                  boxShadow: "0 6px 20px rgba(213, 164, 25, 0.4)",
                },
                transition: "all 0.3s ease",
              }}
            >
              Explore Collection
            </Button>
          </motion.div>
        </Box>
      </Container>

      {/* Slide Indicators */}
      <Box
        sx={{
          position: "absolute",
          bottom: { xs: "20px", sm: "30px", md: "60px" },
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          gap: { xs: 1.5, md: 2 },
          zIndex: 2,
        }}
      >
        {heroImages.map((_, index) => (
          <Box
            key={index}
            onClick={() => setCurrentSlide(index)}
            sx={{
              width: { xs: "32px", md: "40px" },
              height: { xs: "3px", md: "4px" },
              borderRadius: "2px",
              bgcolor:
                currentSlide === index ? "#D5A419" : "rgba(255,255,255,0.5)",
              cursor: "pointer",
              transition: "all 0.3s ease",
              "&:hover": {
                bgcolor:
                  currentSlide === index ? "#D5A419" : "rgba(255,255,255,0.8)",
                transform: "scaleX(1.2)",
              },
            }}
          />
        ))}
      </Box>
    </Box>
  );
};

export default HeroSection;
