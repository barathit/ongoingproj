import React from "react";
import {
  Box,
  Grid,
  Paper,
  Typography,
  Divider,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
} from "@mui/material";
import {
  TrendingUp,
  AttachMoney,
  LocalShipping,
  Bookmark,
  ArrowUpward,
  ArrowDownward,
} from "@mui/icons-material";

// Mock data
const statsData = [
  {
    id: 1,
    title: "Total Sales",
    value: "₹4,58,750",
    icon: <AttachMoney />,
    color: "#4CAF50",
    percent: "+12.5%",
    isUp: true,
  },
  {
    id: 2,
    title: "Total Orders",
    value: "168",
    icon: <TrendingUp />,
    color: "#2196F3",
    percent: "+8.2%",
    isUp: true,
  },
  {
    id: 3,
    title: "Pending Deliveries",
    value: "37",
    icon: <LocalShipping />,
    color: "#FF9800",
    percent: "-4.5%",
    isUp: false,
  },
  {
    id: 4,
    title: "Prebooked Sarees",
    value: "42",
    icon: <Bookmark />,
    color: "#9C27B0",
    percent: "+16.8%",
    isUp: true,
  },
];

const recentOrders = [
  {
    id: "#ORD-5421",
    customer: "Priya Sharma",
    date: "Today, 10:45 AM",
    amount: "₹12,500",
    status: "Pending",
  },
  {
    id: "#ORD-5420",
    customer: "Raj Patel",
    date: "Yesterday, 3:20 PM",
    amount: "₹8,750",
    status: "Delivered",
  },
  {
    id: "#ORD-5419",
    customer: "Ananya Gupta",
    date: "Yesterday, 11:30 AM",
    amount: "₹15,200",
    status: "Processing",
  },
  {
    id: "#ORD-5418",
    customer: "Vikram Singh",
    date: "22 Mar, 5:15 PM",
    amount: "₹9,850",
    status: "Shipped",
  },
  {
    id: "#ORD-5417",
    customer: "Meera Reddy",
    date: "21 Mar, 2:40 PM",
    amount: "₹11,300",
    status: "Delivered",
  },
];

const getStatusColor = (status) => {
  switch (status) {
    case "Delivered":
      return "#4CAF50";
    case "Shipped":
      return "#2196F3";
    case "Processing":
      return "#FF9800";
    case "Pending":
      return "#F44336";
    default:
      return "#757575";
  }
};

const AdminDashboard = () => {
  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ mb: 1, fontWeight: 600 }}>
          Dashboard
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Welcome to the admin dashboard. Here's an overview of your store's
          performance.
        </Typography>
      </Box>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {statsData.map((stat) => (
          <Grid item xs={12} sm={6} md={3} key={stat.id}>
            <Paper
              elevation={0}
              sx={{
                p: 3,
                borderRadius: 2,
                boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
                height: "100%",
              }}
            >
              <Box
                sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}
              >
                <Avatar
                  sx={{
                    bgcolor: `${stat.color}15`,
                    color: stat.color,
                    width: 48,
                    height: 48,
                  }}
                >
                  {stat.icon}
                </Avatar>
                <Box sx={{ textAlign: "right" }}>
                  <Typography
                    variant="caption"
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      color: stat.isUp ? "success.main" : "error.main",
                      fontWeight: 500,
                    }}
                  >
                    {stat.percent}
                    {stat.isUp ? (
                      <ArrowUpward sx={{ fontSize: 16, ml: 0.5 }} />
                    ) : (
                      <ArrowDownward sx={{ fontSize: 16, ml: 0.5 }} />
                    )}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    vs. last month
                  </Typography>
                </Box>
              </Box>
              <Typography variant="h4" sx={{ mt: 2, mb: 0.5, fontWeight: 600 }}>
                {stat.value}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {stat.title}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* Charts and Recent Orders */}
      <Grid container spacing={3}>
        {/* Chart Section */}
        <Grid item xs={12} md={8}>
          <Paper
            elevation={0}
            sx={{
              p: 3,
              borderRadius: 2,
              boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
              height: "100%",
              minHeight: 400,
            }}
          >
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
              Sales Overview
            </Typography>
            <Divider sx={{ mb: 3 }} />

            {/* Placeholder for Chart */}
            <Box
              sx={{
                height: 300,
                width: "100%",
                bgcolor: "rgba(0,0,0,0.03)",
                borderRadius: 2,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography variant="body1" color="text.secondary">
                Sales Chart Visualization
              </Typography>
            </Box>
          </Paper>
        </Grid>

        {/* Recent Orders */}
        <Grid item xs={12} md={4}>
          <Paper
            elevation={0}
            sx={{
              p: 3,
              borderRadius: 2,
              boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
              height: "100%",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 2,
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Recent Orders
              </Typography>
              <Button size="small" color="primary">
                View All
              </Button>
            </Box>
            <Divider sx={{ mb: 2 }} />
            <List sx={{ p: 0 }}>
              {recentOrders.map((order, index) => (
                <React.Fragment key={order.id}>
                  <ListItem sx={{ px: 0, py: 1.5 }}>
                    <ListItemText
                      primary={
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <Typography variant="body2" sx={{ fontWeight: 600 }}>
                            {order.id}
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{
                              color: getStatusColor(order.status),
                              fontWeight: 600,
                            }}
                          >
                            {order.status}
                          </Typography>
                        </Box>
                      }
                      secondary={
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            mt: 0.5,
                          }}
                        >
                          <Typography variant="body2" color="text.secondary">
                            {order.customer}
                          </Typography>
                          <Typography variant="body2" sx={{ fontWeight: 600 }}>
                            {order.amount}
                          </Typography>
                        </Box>
                      }
                    />
                  </ListItem>
                  {index < recentOrders.length - 1 && (
                    <Divider sx={{ my: 0.5 }} />
                  )}
                </React.Fragment>
              ))}
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AdminDashboard;
