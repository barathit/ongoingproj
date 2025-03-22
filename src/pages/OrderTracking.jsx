import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  Paper,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Grid,
  Button,
  Switch,
  FormControlLabel,
  Divider,
} from "@mui/material";
import { motion } from "framer-motion";
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
} from "@mui/lab";
import {
  NotificationsActive,
  WhatsApp,
  Email,
  Sms,
  CheckCircle,
  AccessTime,
  LocalShipping,
} from "@mui/icons-material";

const orderStages = [
  {
    label: "Order Confirmed",
    description:
      "Your prebooking has been confirmed and assigned to our master weaver.",
    date: "2024-02-15",
    completed: true,
  },
  {
    label: "Material Preparation",
    description:
      "Premium silk and zari materials are being prepared for your saree.",
    date: "2024-02-18",
    completed: true,
  },
  {
    label: "Weaving in Progress",
    description:
      "Your saree is currently being handwoven with intricate designs.",
    date: "2024-02-20",
    completed: true,
    currentStage: true,
  },
  {
    label: "Quality Check",
    description: "Final quality inspection and finishing touches.",
    date: null,
    completed: false,
  },
  {
    label: "Ready for Shipping",
    description: "Your saree has been packaged and is ready for delivery.",
    date: null,
    completed: false,
  },
];

const OrderTracking = () => {
  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    whatsapp: true,
  });

  const handleNotificationChange = (type) => {
    setNotifications((prev) => ({
      ...prev,
      [type]: !prev[type],
    }));
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
        <Grid container spacing={4}>
          {/* Order Details */}
          <Grid item xs={12} md={4}>
            <Paper
              elevation={3}
              sx={{
                p: 3,
                borderRadius: 3,
                bgcolor: "#fff",
              }}
            >
              <Typography variant="h5" gutterBottom>
                Order Details
              </Typography>
              <Divider sx={{ my: 2 }} />
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle2" color="text.secondary">
                  Order Number
                </Typography>
                <Typography variant="body1" fontWeight="500">
                  #PRE2024021501
                </Typography>
              </Box>
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle2" color="text.secondary">
                  Estimated Completion
                </Typography>
                <Typography variant="body1" fontWeight="500">
                  March 15, 2024
                </Typography>
              </Box>
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle2" color="text.secondary">
                  Design Type
                </Typography>
                <Typography variant="body1" fontWeight="500">
                  Traditional Kanchipuram
                </Typography>
              </Box>
              <Box>
                <Typography variant="subtitle2" color="text.secondary">
                  Current Stage
                </Typography>
                <Typography
                  variant="body1"
                  fontWeight="500"
                  sx={{ color: "#D5A419" }}
                >
                  Weaving in Progress
                </Typography>
              </Box>
            </Paper>

            {/* Notification Preferences */}
            <Paper
              elevation={3}
              sx={{
                p: 3,
                borderRadius: 3,
                bgcolor: "#fff",
                mt: 3,
              }}
            >
              <Typography variant="h6" gutterBottom>
                Notification Preferences
              </Typography>
              <Box sx={{ mt: 2 }}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={notifications.email}
                      onChange={() => handleNotificationChange("email")}
                      color="primary"
                    />
                  }
                  label={
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <Email fontSize="small" />
                      <Typography>Email Updates</Typography>
                    </Box>
                  }
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={notifications.sms}
                      onChange={() => handleNotificationChange("sms")}
                      color="primary"
                    />
                  }
                  label={
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <Sms fontSize="small" />
                      <Typography>SMS Alerts</Typography>
                    </Box>
                  }
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={notifications.whatsapp}
                      onChange={() => handleNotificationChange("whatsapp")}
                      color="primary"
                    />
                  }
                  label={
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <WhatsApp fontSize="small" />
                      <Typography>WhatsApp Updates</Typography>
                    </Box>
                  }
                />
              </Box>
            </Paper>
          </Grid>

          {/* Progress Timeline */}
          <Grid item xs={12} md={8}>
            <Paper
              elevation={3}
              sx={{
                p: 4,
                borderRadius: 3,
                bgcolor: "#fff",
              }}
            >
              <Typography variant="h5" gutterBottom>
                Order Progress
              </Typography>
              <Timeline sx={{ mt: 3 }}>
                {orderStages.map((stage, index) => (
                  <TimelineItem key={stage.label}>
                    <TimelineSeparator>
                      <TimelineDot
                        color={stage.completed ? "primary" : "grey"}
                        variant={stage.currentStage ? "outlined" : "filled"}
                      >
                        {stage.completed ? <CheckCircle /> : <AccessTime />}
                      </TimelineDot>
                      {index < orderStages.length - 1 && <TimelineConnector />}
                    </TimelineSeparator>
                    <TimelineContent>
                      <Box sx={{ mb: 3 }}>
                        <Typography variant="h6" component="span">
                          {stage.label}
                        </Typography>
                        {stage.date && (
                          <Typography
                            variant="caption"
                            sx={{ ml: 2, color: "text.secondary" }}
                          >
                            {stage.date}
                          </Typography>
                        )}
                        <Typography color="text.secondary" sx={{ mt: 1 }}>
                          {stage.description}
                        </Typography>
                        {stage.currentStage && (
                          <Button
                            variant="outlined"
                            size="small"
                            sx={{ mt: 2 }}
                            onClick={() => {
                              // Navigate to Weaver's Updates
                            }}
                          >
                            View Latest Update
                          </Button>
                        )}
                      </Box>
                    </TimelineContent>
                  </TimelineItem>
                ))}
              </Timeline>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default OrderTracking;
