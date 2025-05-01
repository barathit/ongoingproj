import React, { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Chip,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TablePagination,
  Grid,
  Tooltip,
  Card,
  CardContent,
} from "@mui/material";
import {
  Search,
  Visibility,
  Close,
  TrendingUp,
  AccountBalance,
  Payment,
  Receipt,
} from "@mui/icons-material";

// Mock data for payments
const mockPayments = [
  {
    id: "PAY001",
    orderId: "ORD-5421",
    customerName: "Priya Sharma",
    amount: 35000,
    paymentMethod: "Credit Card",
    status: "Completed",
    date: "2024-03-15",
    transactionId: "TXN123456789",
  },
  {
    id: "PAY002",
    orderId: "ORD-5420",
    customerName: "Raj Patel",
    amount: 42000,
    paymentMethod: "UPI",
    status: "Completed",
    date: "2024-03-14",
    transactionId: "TXN123456790",
  },
  {
    id: "PAY003",
    orderId: "ORD-5419",
    customerName: "Meera Singh",
    amount: 28000,
    paymentMethod: "Net Banking",
    status: "Pending",
    date: "2024-03-14",
    transactionId: "TXN123456791",
  },
  {
    id: "PAY004",
    orderId: "ORD-5418",
    customerName: "Amit Kumar",
    amount: 38500,
    paymentMethod: "Credit Card",
    status: "Failed",
    date: "2024-03-13",
    transactionId: "TXN123456792",
  },
];

// Mock data for revenue statistics
const revenueStats = {
  totalRevenue: 143500,
  pendingAmount: 28000,
  todayRevenue: 77000,
  monthlyRevenue: 325000,
};

const PaymentManagement = () => {
  const [payments, setPayments] = useState(mockPayments);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [statusFilter, setStatusFilter] = useState("All");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const statuses = ["All", "Completed", "Pending", "Failed", "Refunded"];

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleStatusFilterChange = (event) => {
    setStatusFilter(event.target.value);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleOpenDialog = (payment) => {
    setSelectedPayment(payment);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedPayment(null);
  };

  const getStatusChipColor = (status) => {
    switch (status) {
      case "Completed":
        return "success";
      case "Pending":
        return "warning";
      case "Failed":
        return "error";
      case "Refunded":
        return "info";
      default:
        return "default";
    }
  };

  // Filter payments based on search term and status
  const filteredPayments = payments.filter((payment) => {
    const matchesSearch =
      payment.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "All" || payment.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Pagination
  const paginatedPayments = filteredPayments.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 4,
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: 600 }}>
          Payment Management
        </Typography>
      </Box>

      {/* Revenue Statistics */}
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
                <Typography variant="h6">Total Revenue</Typography>
              </Box>
              <Typography variant="h4">
                ₹{revenueStats.totalRevenue.toLocaleString()}
              </Typography>
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
                <Payment sx={{ mr: 1 }} />
                <Typography variant="h6">Pending Amount</Typography>
              </Box>
              <Typography variant="h4">
                ₹{revenueStats.pendingAmount.toLocaleString()}
              </Typography>
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
                <Receipt sx={{ mr: 1 }} />
                <Typography variant="h6">Today's Revenue</Typography>
              </Box>
              <Typography variant="h4">
                ₹{revenueStats.todayRevenue.toLocaleString()}
              </Typography>
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
                <AccountBalance sx={{ mr: 1 }} />
                <Typography variant="h6">Monthly Revenue</Typography>
              </Box>
              <Typography variant="h4">
                ₹{revenueStats.monthlyRevenue.toLocaleString()}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Search and Filters */}
      <Paper
        elevation={0}
        sx={{
          p: 2,
          mb: 3,
          borderRadius: 2,
          display: "flex",
          flexWrap: "wrap",
          gap: 2,
          alignItems: "center",
          boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
        }}
      >
        <TextField
          placeholder="Search payments..."
          variant="outlined"
          size="small"
          value={searchTerm}
          onChange={handleSearch}
          sx={{ flexGrow: 1, minWidth: { xs: "100%", sm: 200 } }}
          InputProps={{
            startAdornment: <Search sx={{ mr: 1, color: "text.secondary" }} />,
          }}
        />

        <FormControl size="small" sx={{ minWidth: 150 }}>
          <InputLabel>Status</InputLabel>
          <Select
            value={statusFilter}
            label="Status"
            onChange={handleStatusFilterChange}
          >
            {statuses.map((status) => (
              <MenuItem key={status} value={status}>
                {status}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Paper>

      {/* Payments Table */}
      <Paper
        elevation={0}
        sx={{
          borderRadius: 2,
          overflow: "hidden",
          boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
        }}
      >
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: "rgba(0,0,0,0.03)" }}>
                <TableCell>Payment ID</TableCell>
                <TableCell>Order ID</TableCell>
                <TableCell>Customer</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Payment Method</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Status</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedPayments.map((payment) => (
                <TableRow key={payment.id} hover>
                  <TableCell sx={{ fontWeight: 500 }}>{payment.id}</TableCell>
                  <TableCell>{payment.orderId}</TableCell>
                  <TableCell>{payment.customerName}</TableCell>
                  <TableCell>₹{payment.amount.toLocaleString()}</TableCell>
                  <TableCell>{payment.paymentMethod}</TableCell>
                  <TableCell>
                    {new Date(payment.date).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={payment.status}
                      color={getStatusChipColor(payment.status)}
                      size="small"
                    />
                  </TableCell>
                  <TableCell align="right">
                    <Tooltip title="View Details">
                      <IconButton
                        size="small"
                        onClick={() => handleOpenDialog(payment)}
                        color="primary"
                      >
                        <Visibility fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredPayments.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>

      {/* Payment Details Dialog */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="h6">Payment Details</Typography>
            <IconButton size="small" onClick={handleCloseDialog}>
              <Close fontSize="small" />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent dividers>
          {selectedPayment && (
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2" color="text.secondary">
                  Payment ID
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 500, mb: 2 }}>
                  {selectedPayment.id}
                </Typography>

                <Typography variant="subtitle2" color="text.secondary">
                  Order ID
                </Typography>
                <Typography variant="body1" sx={{ mb: 2 }}>
                  {selectedPayment.orderId}
                </Typography>

                <Typography variant="subtitle2" color="text.secondary">
                  Customer Name
                </Typography>
                <Typography variant="body1" sx={{ mb: 2 }}>
                  {selectedPayment.customerName}
                </Typography>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2" color="text.secondary">
                  Amount
                </Typography>
                <Typography variant="body1" sx={{ mb: 2 }}>
                  ₹{selectedPayment.amount.toLocaleString()}
                </Typography>

                <Typography variant="subtitle2" color="text.secondary">
                  Payment Method
                </Typography>
                <Typography variant="body1" sx={{ mb: 2 }}>
                  {selectedPayment.paymentMethod}
                </Typography>

                <Typography variant="subtitle2" color="text.secondary">
                  Transaction ID
                </Typography>
                <Typography variant="body1" sx={{ mb: 2 }}>
                  {selectedPayment.transactionId}
                </Typography>
              </Grid>

              <Grid item xs={12}>
                <Typography variant="subtitle2" color="text.secondary">
                  Date & Time
                </Typography>
                <Typography variant="body1" sx={{ mb: 2 }}>
                  {new Date(selectedPayment.date).toLocaleString("en-IN", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </Typography>
              </Grid>

              <Grid item xs={12}>
                <Typography variant="subtitle2" color="text.secondary">
                  Status
                </Typography>
                <Chip
                  label={selectedPayment.status}
                  color={getStatusChipColor(selectedPayment.status)}
                  sx={{ mt: 1 }}
                />
              </Grid>
            </Grid>
          )}
        </DialogContent>
        <DialogActions sx={{ px: 3, py: 2 }}>
          <Button
            onClick={handleCloseDialog}
            variant="outlined"
            color="inherit"
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default PaymentManagement;
