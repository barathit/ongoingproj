import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  Paper,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { motion } from "framer-motion";
import { PlayCircle, Message, Edit } from "@mui/icons-material";

const updates = [
  {
    id: 1,
    date: "2024-02-20",
    time: "14:30",
    type: "photo",
    media:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPgO0rtfWFxQmgz_Xp7Aa5ErcIvVmxfa9ZUQ&s",
    description:
      "Started working on the border pattern. The zari work is coming along beautifully.",
    weaver: "Master Weaver Rajesh",
  },
  {
    id: 2,
    date: "2024-02-20",
    time: "16:45",
    type: "video",
    media: "https://example.com/video1.mp4",
    thumbnail:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZ-CCjmyMkfEBWOOZTgxKM4Ay-zJaWLyzdHw&s",
    description:
      "Demonstrating the intricate weaving process for the pallu design.",
    weaver: "Master Weaver Rajesh",
  },
  {
    id: 3,
    date: "2024-02-21",
    time: "09:15",
    type: "photo",
    media:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnbj7VzPUJYx9PZPLeJVmlaQGKUR7qA6wbMg&s",
    description:
      "Completed 40% of the saree. The color transitions are exactly as requested.",
    weaver: "Master Weaver Rajesh",
  },
];

const WeaverUpdates = () => {
  const [modificationRequest, setModificationRequest] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedUpdate, setSelectedUpdate] = useState(null);

  const handleOpenDialog = (update) => {
    setSelectedUpdate(update);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedUpdate(null);
  };

  const handleSubmitModification = () => {
    // Handle modification request submission
    console.log("Modification request:", modificationRequest);
    handleCloseDialog();
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
        <Typography
          variant="h4"
          component={motion.h1}
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          sx={{
            color: "#2C1810",
            fontWeight: 700,
            mb: 4,
          }}
        >
          Weaver's Updates
        </Typography>

        <Grid container spacing={4}>
          {updates.map((update) => (
            <Grid item xs={12} md={6} lg={4} key={update.id}>
              <Card
                component={motion.div}
                whileHover={{ y: -8 }}
                sx={{
                  height: "100%",
                  borderRadius: 3,
                  overflow: "hidden",
                  boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
                }}
              >
                <Box sx={{ position: "relative" }}>
                  <CardMedia
                    component="img"
                    height="240"
                    image={
                      update.type === "video" ? update.thumbnail : update.media
                    }
                    alt={`Update ${update.id}`}
                  />
                  {update.type === "video" && (
                    <Box
                      sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        color: "#fff",
                        cursor: "pointer",
                      }}
                    >
                      <PlayCircle sx={{ fontSize: 64 }} />
                    </Box>
                  )}
                </Box>
                <CardContent>
                  <Typography
                    variant="caption"
                    sx={{ color: "text.secondary", display: "block", mb: 1 }}
                  >
                    {update.date} at {update.time}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    sx={{ fontWeight: 600, mb: 1 }}
                  >
                    {update.weaver}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: "text.secondary", mb: 2 }}
                  >
                    {update.description}
                  </Typography>
                  <Box sx={{ display: "flex", gap: 2 }}>
                    <Button
                      variant="outlined"
                      size="small"
                      startIcon={<Message />}
                      onClick={() => handleOpenDialog(update)}
                    >
                      Request Changes
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Modification Request Dialog */}
        <Dialog
          open={openDialog}
          onClose={handleCloseDialog}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>Request Modifications</DialogTitle>
          <DialogContent>
            <Typography variant="body2" sx={{ mb: 2, color: "text.secondary" }}>
              Please describe any changes you'd like to request for this stage
              of the weaving process. Our master weaver will review and respond
              to your request.
            </Typography>
            <TextField
              fullWidth
              multiline
              rows={4}
              variant="outlined"
              placeholder="Describe your requested modifications..."
              value={modificationRequest}
              onChange={(e) => setModificationRequest(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Cancel</Button>
            <Button
              variant="contained"
              onClick={handleSubmitModification}
              disabled={!modificationRequest.trim()}
            >
              Submit Request
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Box>
  );
};

export default WeaverUpdates;
