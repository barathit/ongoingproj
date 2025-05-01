import React from "react";
import {
  Box,
  Grid,
  Paper,
  Typography,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  IconButton,
  Tooltip,
} from "@mui/material";
import {
  TrendingUp,
  ShoppingCart,
  People,
  Inventory,
  Visibility,
  ArrowUpward,
  ArrowDownward,
} from "@mui/icons-material";

// Mock data for dashboard statistics
const stats = {
  totalSales: 325000,
  totalOrders: 48,
  activeCustomers: 125,
  totalProducts: 85,
  salesGrowth: 12.5,
  ordersGrowth: 8.3,
  customersGrowth: 15.2,
  productsGrowth: 5.7,
};

// Mock data for recent orders
const recentOrders = [
  {
    id: "ORD-5421",
    customer: "Priya Sharma",
    product: "Kanchipuram Silk Saree",
    amount: 35000,
    status: "Processing",
    date: "2024-03-20",
  },
  {
    id: "ORD-5420",
    customer: "Raj Patel",
    product: "Banarasi Silk Saree",
    amount: 42000,
    status: "Confirmed",
    date: "2024-03-19",
  },
  {
    id: "ORD-5419",
    customer: "Meera Singh",
    product: "Mysore Silk Saree",
    amount: 28000,
    status: "Delivered",
    date: "2024-03-18",
  },
  {
    id: "ORD-5418",
    customer: "Amit Kumar",
    product: "Patola Silk Saree",
    amount: 38500,
    status: "Processing",
    date: "2024-03-17",
  },
];

// Mock data for top selling products
const topProducts = [
  {
    name: "Kanchipuram Silk Saree",
    sales: 15,
    revenue: 525000,
    stock: 12,
  },
  {
    name: "Banarasi Silk Saree",
    sales: 12,
    revenue: 420000,
    stock: 8,
  },
  {
    name: "Mysore Silk Saree",
    sales: 10,
    revenue: 280000,
    stock: 15,
  },
  {
    name: "Patola Silk Saree",
    sales: 8,
    revenue: 308000,
    stock: 6,
  },
];

const Dashboard = () => {
  const getStatusChipColor = (status) => {
    switch (status) {
      case "Processing":
        return "warning";
      case "Confirmed":
        return "info";
      case "Delivered":
        return "success";
      case "Cancelled":
        return "error";
      default:
        return "default";
    }
  };

  return (
    <Box>
      <Typography variant="h4" sx={{ fontWeight: 600, mb: 4 }}>
        Dashboard Overview
      </Typography>

      {/* Statistics Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card
            elevation={0}
            sx={{
              bgcolor: "primary.light",
              color: "primary.contrastText",
              borderRadius: 2,
              boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
            }}
          >
            <CardContent>
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <TrendingUp sx={{ mr: 1 }} />
                <Typography variant="h6">Total Sales</Typography>
              </Box>
              <Typography variant="h4">
                ₹{stats.totalSales.toLocaleString()}
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                <ArrowUpward sx={{ fontSize: "1rem", mr: 0.5 }} />
                <Typography variant="body2">
                  {stats.salesGrowth}% from last month
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card
            elevation={0}
            sx={{
              bgcolor: "warning.light",
              color: "warning.contrastText",
              borderRadius: 2,
              boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
            }}
          >
            <CardContent>
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <ShoppingCart sx={{ mr: 1 }} />
                <Typography variant="h6">Total Orders</Typography>
              </Box>
              <Typography variant="h4">{stats.totalOrders}</Typography>
              <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                <ArrowUpward sx={{ fontSize: "1rem", mr: 0.5 }} />
                <Typography variant="body2">
                  {stats.ordersGrowth}% from last month
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card
            elevation={0}
            sx={{
              bgcolor: "success.light",
              color: "success.contrastText",
              borderRadius: 2,
              boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
            }}
          >
            <CardContent>
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <People sx={{ mr: 1 }} />
                <Typography variant="h6">Active Customers</Typography>
              </Box>
              <Typography variant="h4">{stats.activeCustomers}</Typography>
              <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                <ArrowUpward sx={{ fontSize: "1rem", mr: 0.5 }} />
                <Typography variant="body2">
                  {stats.customersGrowth}% from last month
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card
            elevation={0}
            sx={{
              bgcolor: "info.light",
              color: "info.contrastText",
              borderRadius: 2,
              boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
            }}
          >
            <CardContent>
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <Inventory sx={{ mr: 1 }} />
                <Typography variant="h6">Total Products</Typography>
              </Box>
              <Typography variant="h4">{stats.totalProducts}</Typography>
              <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                <ArrowUpward sx={{ fontSize: "1rem", mr: 0.5 }} />
                <Typography variant="body2">
                  {stats.productsGrowth}% from last month
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Recent Orders */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper
            elevation={0}
            sx={{
              p: 3,
              borderRadius: 2,
              boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
            }}
          >
            <Typography variant="h6" sx={{ mb: 3 }}>
              Recent Orders
            </Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Order ID</TableCell>
                    <TableCell>Customer</TableCell>
                    <TableCell>Product</TableCell>
                    <TableCell>Amount</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell align="right">Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {recentOrders.map((order) => (
                    <TableRow key={order.id} hover>
                      <TableCell sx={{ fontWeight: 500 }}>{order.id}</TableCell>
                      <TableCell>{order.customer}</TableCell>
                      <TableCell>{order.product}</TableCell>
                      <TableCell>₹{order.amount.toLocaleString()}</TableCell>
                      <TableCell>
                        <Chip
                          label={order.status}
                          color={getStatusChipColor(order.status)}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>
                        {new Date(order.date).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </TableCell>
                      <TableCell align="right">
                        <Tooltip title="View Details">
                          <IconButton size="small" color="primary">
                            <Visibility fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>

        {/* Top Selling Products */}
        <Grid item xs={12} md={4}>
          <Paper
            elevation={0}
            sx={{
              p: 3,
              borderRadius: 2,
              boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
            }}
          >
            <Typography variant="h6" sx={{ mb: 3 }}>
              Top Selling Products
            </Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Product</TableCell>
                    <TableCell align="right">Sales</TableCell>
                    <TableCell align="right">Stock</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {topProducts.map((product) => (
                    <TableRow key={product.name} hover>
                      <TableCell sx={{ fontWeight: 500 }}>
                        {product.name}
                      </TableCell>
                      <TableCell align="right">{product.sales}</TableCell>
                      <TableCell align="right">
                        <Chip
                          label={product.stock}
                          color={product.stock < 10 ? "warning" : "success"}
                          size="small"
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
