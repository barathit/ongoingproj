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
  Grid,
  Divider,
  Stepper,
  Step,
  StepLabel,
  TablePagination,
  InputAdornment,
  Tooltip,
  List,
  ListItem,
  ListItemText,
  Switch,
  FormControlLabel,
} from "@mui/material";
import {
  Search,
  Edit,
  Delete,
  Visibility,
  NotificationsActive,
  Close,
  Refresh,
  ArrowDropDown,
} from "@mui/icons-material";

// Mock data for orders
const mockOrders = [
  {
    id: "ORD-5421",
    customer: "Priya Sharma",
    date: "2025-03-20",
    amount: 12500,
    items: 2,
    status: "Processing",
    phone: "+91 9876543210",
    email: "priya.sharma@example.com",
    address: "123 Main St, Bangalore, Karnataka 560001",
    paymentMethod: "Credit Card",
    products: [
      { id: 1, name: "Kanchipuram Silk Saree", quantity: 1, price: 8500 },
      { id: 5, name: "Pochampally Ikat Saree", quantity: 1, price: 4000 },
    ],
    tracking: [
      { status: "Order Placed", date: "2025-03-20", completed: true },
      { status: "Payment Confirmed", date: "2025-03-20", completed: true },
      { status: "Processing", date: "2025-03-21", completed: true },
      { status: "Shipped", date: null, completed: false },
      { status: "Delivered", date: null, completed: false },
    ],
  },
  {
    id: "ORD-5420",
    customer: "Raj Patel",
    date: "2025-03-19",
    amount: 8750,
    items: 1,
    status: "Delivered",
    phone: "+91 8765432109",
    email: "raj.patel@example.com",
    address: "456 Park Ave, Mumbai, Maharashtra 400001",
    paymentMethod: "UPI",
    products: [
      { id: 2, name: "Banarasi Silk Saree", quantity: 1, price: 8750 },
    ],
    tracking: [
      { status: "Order Placed", date: "2025-03-19", completed: true },
      { status: "Payment Confirmed", date: "2025-03-19", completed: true },
      { status: "Processing", date: "2025-03-19", completed: true },
      { status: "Shipped", date: "2025-03-20", completed: true },
      { status: "Delivered", date: "2025-03-21", completed: true },
    ],
  },
  {
    id: "ORD-5419",
    customer: "Ananya Gupta",
    date: "2025-03-19",
    amount: 15200,
    items: 2,
    status: "Shipped",
    phone: "+91 7654321098",
    email: "ananya.gupta@example.com",
    address: "789 First Rd, Delhi, 110001",
    paymentMethod: "Net Banking",
    products: [
      { id: 3, name: "Mysore Silk Saree", quantity: 1, price: 9800 },
      { id: 4, name: "Cotton Handloom Saree", quantity: 1, price: 5400 },
    ],
    tracking: [
      { status: "Order Placed", date: "2025-03-19", completed: true },
      { status: "Payment Confirmed", date: "2025-03-19", completed: true },
      { status: "Processing", date: "2025-03-20", completed: true },
      { status: "Shipped", date: "2025-03-21", completed: true },
      { status: "Delivered", date: null, completed: false },
    ],
  },
  {
    id: "ORD-5418",
    customer: "Vikram Singh",
    date: "2025-03-18",
    amount: 9850,
    items: 1,
    status: "Confirmed",
    phone: "+91 6543210987",
    email: "vikram.singh@example.com",
    address: "101 Lake View, Chennai, Tamil Nadu 600001",
    paymentMethod: "Cash on Delivery",
    products: [{ id: 6, name: "Patola Silk Saree", quantity: 1, price: 9850 }],
    tracking: [
      { status: "Order Placed", date: "2025-03-18", completed: true },
      { status: "Payment Confirmed", date: "2025-03-18", completed: true },
      { status: "Processing", date: null, completed: false },
      { status: "Shipped", date: null, completed: false },
      { status: "Delivered", date: null, completed: false },
    ],
  },
  {
    id: "ORD-5417",
    customer: "Meera Reddy",
    date: "2025-03-17",
    amount: 11300,
    items: 1,
    status: "Cancelled",
    phone: "+91 5432109876",
    email: "meera.reddy@example.com",
    address: "222 Hill Road, Hyderabad, Telangana 500001",
    paymentMethod: "Debit Card",
    products: [{ id: 8, name: "Tussar Silk Saree", quantity: 1, price: 11300 }],
    tracking: [
      { status: "Order Placed", date: "2025-03-17", completed: true },
      { status: "Payment Confirmed", date: "2025-03-17", completed: true },
      { status: "Cancelled", date: "2025-03-18", completed: true },
    ],
  },
];

const OrderManagement = () => {
  const [orders, setOrders] = useState(mockOrders);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
  const [openNotifyDialog, setOpenNotifyDialog] = useState(false);
  const [statusFilter, setStatusFilter] = useState("All");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [notificationOptions, setNotificationOptions] = useState({
    email: true,
    sms: true,
    whatsapp: false,
  });

  // Status options for filtering and updating
  const statusOptions = [
    "All",
    "Confirmed",
    "Processing",
    "Shipped",
    "Delivered",
    "Cancelled",
  ];

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

  const handleViewDetails = (order) => {
    setSelectedOrder(order);
    setOpenDetailsDialog(true);
  };

  const handleUpdateStatus = (order) => {
    setSelectedOrder(order);
    setOpenUpdateDialog(true);
  };

  const handleNotifyCustomer = (order) => {
    setSelectedOrder(order);
    setOpenNotifyDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDetailsDialog(false);
    setOpenUpdateDialog(false);
    setOpenNotifyDialog(false);
    setSelectedOrder(null);
  };

  const handleSaveStatusUpdate = () => {
    if (selectedOrder) {
      const updatedOrders = orders.map((order) => {
        if (order.id === selectedOrder.id) {
          return { ...selectedOrder };
        }
        return order;
      });
      setOrders(updatedOrders);
    }
    handleCloseDialog();
  };

  const handleNotificationOptionChange = (event) => {
    setNotificationOptions({
      ...notificationOptions,
      [event.target.name]: event.target.checked,
    });
  };

  const handleSendNotification = () => {
    // In a real app, this would send notifications via selected channels
    console.log("Sending notification to:", selectedOrder.customer);
    console.log("Notification options:", notificationOptions);
    handleCloseDialog();
  };

  const getStatusChipColor = (status) => {
    switch (status) {
      case "Delivered":
        return "success";
      case "Shipped":
        return "info";
      case "Processing":
        return "warning";
      case "Confirmed":
        return "primary";
      case "Cancelled":
        return "error";
      default:
        return "default";
    }
  };

  const updateOrderStatus = (status) => {
    if (!selectedOrder) return;

    const newTracking = [...selectedOrder.tracking];
    const currentStatusIndex = newTracking.findIndex(
      (track) => track.status === status
    );

    if (currentStatusIndex >= 0) {
      // Update all previous steps as completed
      for (let i = 0; i <= currentStatusIndex; i++) {
        newTracking[i].completed = true;
        if (!newTracking[i].date) {
          newTracking[i].date = new Date().toISOString().split("T")[0];
        }
      }

      // Update all next steps as not completed
      for (let i = currentStatusIndex + 1; i < newTracking.length; i++) {
        if (newTracking[i].status !== "Cancelled") {
          newTracking[i].completed = false;
          newTracking[i].date = null;
        }
      }

      setSelectedOrder({
        ...selectedOrder,
        status,
        tracking: newTracking,
      });
    }
  };

  // Filter orders based on search term and status filter
  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "All" || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Pagination
  const paginatedOrders = filteredOrders.slice(
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
          Order Management
        </Typography>
      </Box>

      {/* Filters & Search */}
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
          placeholder="Search orders..."
          variant="outlined"
          size="small"
          value={searchTerm}
          onChange={handleSearch}
          sx={{ flexGrow: 1, minWidth: { xs: "100%", sm: 200 } }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
        />

        <FormControl size="small" sx={{ minWidth: 150 }}>
          <InputLabel id="status-filter-label">Status</InputLabel>
          <Select
            labelId="status-filter-label"
            value={statusFilter}
            label="Status"
            onChange={handleStatusFilterChange}
          >
            {statusOptions.map((status) => (
              <MenuItem key={status} value={status}>
                {status}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Paper>

      {/* Orders Table */}
      <Paper
        elevation={0}
        sx={{
          borderRadius: 2,
          overflow: "hidden",
          boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
        }}
      >
        <TableContainer>
          <Table sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow sx={{ bgcolor: "rgba(0,0,0,0.03)" }}>
                <TableCell>Order ID</TableCell>
                <TableCell>Customer</TableCell>
                <TableCell>Date</TableCell>
                <TableCell align="right">Amount (₹)</TableCell>
                <TableCell align="center">Items</TableCell>
                <TableCell>Status</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedOrders.map((order) => (
                <TableRow key={order.id} hover>
                  <TableCell sx={{ fontWeight: 500 }}>{order.id}</TableCell>
                  <TableCell>{order.customer}</TableCell>
                  <TableCell>
                    {new Date(order.date).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </TableCell>
                  <TableCell align="right">
                    ₹{order.amount.toLocaleString()}
                  </TableCell>
                  <TableCell align="center">{order.items}</TableCell>
                  <TableCell>
                    <Chip
                      label={order.status}
                      color={getStatusChipColor(order.status)}
                      size="small"
                      variant="outlined"
                    />
                  </TableCell>
                  <TableCell align="right">
                    <Tooltip title="View Details">
                      <IconButton
                        size="small"
                        onClick={() => handleViewDetails(order)}
                        color="primary"
                      >
                        <Visibility fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Update Status">
                      <IconButton
                        size="small"
                        onClick={() => handleUpdateStatus(order)}
                        sx={{ color: "#FF9800", mx: 1 }}
                        disabled={order.status === "Cancelled"}
                      >
                        <Edit fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Notify Customer">
                      <IconButton
                        size="small"
                        onClick={() => handleNotifyCustomer(order)}
                        sx={{ color: "#2C1810" }}
                        disabled={order.status === "Cancelled"}
                      >
                        <NotificationsActive fontSize="small" />
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
          count={filteredOrders.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>

      {/* Order Details Dialog */}
      <Dialog
        open={openDetailsDialog}
        onClose={handleCloseDialog}
        maxWidth="md"
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
            <Typography variant="h6">
              Order Details: {selectedOrder?.id}
            </Typography>
            <IconButton size="small" onClick={handleCloseDialog}>
              <Close fontSize="small" />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent dividers>
          {selectedOrder && (
            <Grid container spacing={3}>
              {/* Customer Information */}
              <Grid item xs={12} md={6}>
                <Typography variant="h6" sx={{ mb: 2 }}>
                  Customer Information
                </Typography>
                <Box sx={{ mb: 2 }}>
                  <Typography variant="body2" color="text.secondary">
                    Name
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 500 }}>
                    {selectedOrder.customer}
                  </Typography>
                </Box>
                <Box sx={{ mb: 2 }}>
                  <Typography variant="body2" color="text.secondary">
                    Email
                  </Typography>
                  <Typography variant="body1">{selectedOrder.email}</Typography>
                </Box>
                <Box sx={{ mb: 2 }}>
                  <Typography variant="body2" color="text.secondary">
                    Phone
                  </Typography>
                  <Typography variant="body1">{selectedOrder.phone}</Typography>
                </Box>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Shipping Address
                  </Typography>
                  <Typography variant="body1">
                    {selectedOrder.address}
                  </Typography>
                </Box>
              </Grid>

              {/* Order Information */}
              <Grid item xs={12} md={6}>
                <Typography variant="h6" sx={{ mb: 2 }}>
                  Order Information
                </Typography>
                <Box sx={{ mb: 2 }}>
                  <Typography variant="body2" color="text.secondary">
                    Order Date
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 500 }}>
                    {new Date(selectedOrder.date).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </Typography>
                </Box>
                <Box sx={{ mb: 2 }}>
                  <Typography variant="body2" color="text.secondary">
                    Payment Method
                  </Typography>
                  <Typography variant="body1">
                    {selectedOrder.paymentMethod}
                  </Typography>
                </Box>
                <Box sx={{ mb: 2 }}>
                  <Typography variant="body2" color="text.secondary">
                    Status
                  </Typography>
                  <Chip
                    label={selectedOrder.status}
                    color={getStatusChipColor(selectedOrder.status)}
                    size="small"
                    variant="outlined"
                    sx={{ mt: 0.5 }}
                  />
                </Box>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Total Amount
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{ fontWeight: 600, color: "#D5A419" }}
                  >
                    ₹{selectedOrder.amount.toLocaleString()}
                  </Typography>
                </Box>
              </Grid>

              {/* Order Items */}
              <Grid item xs={12}>
                <Divider sx={{ my: 2 }} />
                <Typography variant="h6" sx={{ mb: 2 }}>
                  Order Items
                </Typography>
                <TableContainer>
                  <Table size="small">
                    <TableHead>
                      <TableRow sx={{ bgcolor: "rgba(0,0,0,0.03)" }}>
                        <TableCell>Product</TableCell>
                        <TableCell align="right">Price (₹)</TableCell>
                        <TableCell align="center">Quantity</TableCell>
                        <TableCell align="right">Total (₹)</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {selectedOrder.products.map((product) => (
                        <TableRow key={product.id}>
                          <TableCell>{product.name}</TableCell>
                          <TableCell align="right">
                            ₹{product.price.toLocaleString()}
                          </TableCell>
                          <TableCell align="center">
                            {product.quantity}
                          </TableCell>
                          <TableCell align="right">
                            ₹
                            {(
                              product.price * product.quantity
                            ).toLocaleString()}
                          </TableCell>
                        </TableRow>
                      ))}
                      <TableRow>
                        <TableCell
                          colSpan={3}
                          align="right"
                          sx={{ fontWeight: 600 }}
                        >
                          Total:
                        </TableCell>
                        <TableCell
                          align="right"
                          sx={{ fontWeight: 600, color: "#D5A419" }}
                        >
                          ₹{selectedOrder.amount.toLocaleString()}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>

              {/* Order Timeline */}
              <Grid item xs={12}>
                <Divider sx={{ my: 2 }} />
                <Typography variant="h6" sx={{ mb: 2 }}>
                  Order Timeline
                </Typography>
                <Stepper
                  activeStep={
                    selectedOrder.tracking.filter((t) => t.completed).length
                  }
                  alternativeLabel
                >
                  {selectedOrder.tracking.map((track) => (
                    <Step key={track.status} completed={track.completed}>
                      <StepLabel>
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                          {track.status}
                        </Typography>
                        {track.date && (
                          <Typography variant="caption" color="text.secondary">
                            {new Date(track.date).toLocaleDateString("en-IN", {
                              day: "numeric",
                              month: "short",
                            })}
                          </Typography>
                        )}
                      </StepLabel>
                    </Step>
                  ))}
                </Stepper>
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
          <Button
            variant="contained"
            onClick={() => handleUpdateStatus(selectedOrder)}
            sx={{ bgcolor: "#D5A419", "&:hover": { bgcolor: "#B58A14" } }}
          >
            Update Status
          </Button>
        </DialogActions>
      </Dialog>

      {/* Update Status Dialog */}
      <Dialog
        open={openUpdateDialog}
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
            <Typography variant="h6">Update Order Status</Typography>
            <IconButton size="small" onClick={handleCloseDialog}>
              <Close fontSize="small" />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent dividers>
          {selectedOrder && (
            <Box>
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle1" sx={{ mb: 1 }}>
                  Order ID: <strong>{selectedOrder.id}</strong>
                </Typography>
                <Typography variant="subtitle1">
                  Customer: <strong>{selectedOrder.customer}</strong>
                </Typography>
              </Box>

              <FormControl fullWidth sx={{ mb: 3 }}>
                <InputLabel id="update-status-label">Status</InputLabel>
                <Select
                  labelId="update-status-label"
                  value={selectedOrder.status}
                  label="Status"
                  onChange={(e) => updateOrderStatus(e.target.value)}
                >
                  {statusOptions
                    .filter((status) => status !== "All")
                    .map((status) => (
                      <MenuItem key={status} value={status}>
                        {status}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>

              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle1" sx={{ mb: 2 }}>
                  Order Timeline
                </Typography>
                <Stepper
                  activeStep={
                    selectedOrder.tracking.filter((t) => t.completed).length
                  }
                  orientation="vertical"
                >
                  {selectedOrder.tracking.map((track, index) => (
                    <Step key={track.status} completed={track.completed}>
                      <StepLabel>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            width: "100%",
                          }}
                        >
                          <Typography variant="body2" sx={{ fontWeight: 500 }}>
                            {track.status}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {track.date
                              ? new Date(track.date).toLocaleDateString(
                                  "en-IN",
                                  {
                                    day: "numeric",
                                    month: "short",
                                    year: "numeric",
                                  }
                                )
                              : "Pending"}
                          </Typography>
                        </Box>
                      </StepLabel>
                    </Step>
                  ))}
                </Stepper>
              </Box>

              <FormControlLabel
                control={
                  <Switch
                    checked={notificationOptions.email}
                    onChange={handleNotificationOptionChange}
                    name="email"
                  />
                }
                label="Send email notification to customer"
              />
            </Box>
          )}
        </DialogContent>
        <DialogActions sx={{ px: 3, py: 2 }}>
          <Button
            onClick={handleCloseDialog}
            variant="outlined"
            color="inherit"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSaveStatusUpdate}
            variant="contained"
            sx={{ bgcolor: "#D5A419", "&:hover": { bgcolor: "#B58A14" } }}
          >
            Update Status
          </Button>
        </DialogActions>
      </Dialog>

      {/* Notify Customer Dialog */}
      <Dialog
        open={openNotifyDialog}
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
            <Typography variant="h6">Notify Customer</Typography>
            <IconButton size="small" onClick={handleCloseDialog}>
              <Close fontSize="small" />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent dividers>
          {selectedOrder && (
            <Box>
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle1" sx={{ mb: 1 }}>
                  Order ID: <strong>{selectedOrder.id}</strong>
                </Typography>
                <Typography variant="subtitle1" sx={{ mb: 1 }}>
                  Customer: <strong>{selectedOrder.customer}</strong>
                </Typography>
                <Typography variant="subtitle2">
                  Status:{" "}
                  <Chip
                    label={selectedOrder.status}
                    color={getStatusChipColor(selectedOrder.status)}
                    size="small"
                  />
                </Typography>
              </Box>

              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle1" sx={{ mb: 2 }}>
                  Notification Methods
                </Typography>
                <FormControlLabel
                  control={
                    <Switch
                      checked={notificationOptions.email}
                      onChange={handleNotificationOptionChange}
                      name="email"
                    />
                  }
                  label={`Email (${selectedOrder.email})`}
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={notificationOptions.sms}
                      onChange={handleNotificationOptionChange}
                      name="sms"
                    />
                  }
                  label={`SMS (${selectedOrder.phone})`}
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={notificationOptions.whatsapp}
                      onChange={handleNotificationOptionChange}
                      name="whatsapp"
                    />
                  }
                  label={`WhatsApp (${selectedOrder.phone})`}
                />
              </Box>

              <TextField
                label="Custom Message (Optional)"
                multiline
                rows={4}
                fullWidth
                variant="outlined"
                placeholder="Enter a custom message to include in the notification..."
              />
            </Box>
          )}
        </DialogContent>
        <DialogActions sx={{ px: 3, py: 2 }}>
          <Button
            onClick={handleCloseDialog}
            variant="outlined"
            color="inherit"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSendNotification}
            variant="contained"
            sx={{ bgcolor: "#D5A419", "&:hover": { bgcolor: "#B58A14" } }}
          >
            Send Notification
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default OrderManagement;
