import React from "react";
import { Box } from "@mui/material";
import { motion } from "framer-motion";
import HeroSection from "../components/HeroSection";
import FeaturedCollection from "../components/FeaturedCollection";
import WeaverStory from "../components/WeaverStory";
import WeavingProcess from "../components/WeavingProcess";
import WhyChooseUs from "../components/WhyChooseUs";
import Testimonials from "../components/Testimonials";

// Animation variants for sections
const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
};

const Home = () => {
  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      sx={{
        width: "100%",
        overflow: "hidden",
        background: "linear-gradient(180deg, #FFFFFF 0%, #F8F8F8 100%)",
        mt: { xs: "56px", sm: "64px", md: "64px" },
      }}
    >
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <HeroSection />
      </motion.div>

      <Box
        sx={{
          background: "linear-gradient(180deg, #F8F8F8 0%, #FFFFFF 100%)",
          py: { xs: 4, md: 8 },
        }}
      >
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <FeaturedCollection />
        </motion.div>
      </Box>

      <Box
        sx={{
          background: "linear-gradient(180deg, #FFFFFF 0%, #F9F5F0 100%)",
          py: { xs: 4, md: 8 },
        }}
      >
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <WhyChooseUs />
        </motion.div>
      </Box>

      <Box
        sx={{
          background: "linear-gradient(180deg, #F9F5F0 0%, #FFFFFF 100%)",
          py: { xs: 4, md: 8 },
        }}
      >
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <WeaverStory />
        </motion.div>
      </Box>

      <Box
        sx={{
          background: "linear-gradient(180deg, #FFFFFF 0%, #F8F8F8 100%)",
          py: { xs: 4, md: 8 },
        }}
      >
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <WeavingProcess />
        </motion.div>
      </Box>

      <Box
        sx={{
          background: "linear-gradient(180deg, #F8F8F8 0%, #FFFFFF 100%)",
          py: { xs: 4, md: 8 },
        }}
      >
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <Testimonials />
        </motion.div>
      </Box>
    </Box>
  );
};

export default Home;
