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
  Avatar,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TablePagination,
  InputAdornment,
  Grid,
  Tooltip,
  Tabs,
  Tab,
  Divider,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import {
  Search,
  Edit,
  Delete,
  Visibility,
  Email,
  Phone,
  PersonAdd,
  Close,
  AccountCircle,
} from "@mui/icons-material";

// Mock data for users
const mockUsers = [
  {
    id: 1,
    name: "Priya Sharma",
    email: "priya.sharma@example.com",
    phone: "+91 9876543210",
    role: "Customer",
    status: "Active",
    avatar: "",
    joinDate: "2023-10-15",
    totalOrders: 5,
    totalSpent: 48500,
    address: "123 Main St, Bangalore, Karnataka 560001",
    orderHistory: [
      {
        id: "ORD-5421",
        date: "2025-03-20",
        amount: 12500,
        status: "Processing",
      },
      { id: "ORD-5298", date: "2025-02-15", amount: 8750, status: "Delivered" },
      {
        id: "ORD-5105",
        date: "2025-01-10",
        amount: 15200,
        status: "Delivered",
      },
    ],
  },
  {
    id: 2,
    name: "Raj Patel",
    email: "raj.patel@example.com",
    phone: "+91 8765432109",
    role: "Customer",
    status: "Active",
    avatar: "",
    joinDate: "2023-09-20",
    totalOrders: 3,
    totalSpent: 29850,
    address: "456 Park Ave, Mumbai, Maharashtra 400001",
    orderHistory: [
      { id: "ORD-5420", date: "2025-03-19", amount: 8750, status: "Delivered" },
      {
        id: "ORD-5199",
        date: "2025-01-25",
        amount: 12200,
        status: "Delivered",
      },
    ],
  },
  {
    id: 3,
    name: "Amit Kumar",
    email: "amit.kumar@example.com",
    phone: "+91 7654321098",
    role: "Admin",
    status: "Active",
    avatar: "",
    joinDate: "2023-01-05",
    totalOrders: 0,
    totalSpent: 0,
    address: "789 First Rd, Delhi, 110001",
    orderHistory: [],
  },
  {
    id: 4,
    name: "Neha Singh",
    email: "neha.singh@example.com",
    phone: "+91 6543210987",
    role: "Weaver",
    status: "Active",
    avatar: "",
    joinDate: "2023-06-12",
    totalOrders: 0,
    totalSpent: 0,
    address: "101 Lake View, Chennai, Tamil Nadu 600001",
    orderHistory: [],
  },
  {
    id: 5,
    name: "Vikram Singh",
    email: "vikram.singh@example.com",
    phone: "+91 6543210987",
    role: "Customer",
    status: "Inactive",
    avatar: "",
    joinDate: "2023-07-18",
    totalOrders: 2,
    totalSpent: 21150,
    address: "101 Lake View, Chennai, Tamil Nadu 600001",
    orderHistory: [
      { id: "ORD-5418", date: "2025-03-18", amount: 9850, status: "Confirmed" },
    ],
  },
];

const UserManagement = () => {
  const [users, setUsers] = useState(mockUsers);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [openUserDialog, setOpenUserDialog] = useState(false);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [roleFilter, setRoleFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [tabValue, setTabValue] = useState(0);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    phone: "",
    role: "Customer",
    status: "Active",
    address: "",
  });

  // Role and status options
  const roles = ["All", "Customer", "Admin", "Weaver"];
  const statuses = ["All", "Active", "Inactive"];

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleRoleFilterChange = (event) => {
    setRoleFilter(event.target.value);
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

  const handleOpenUserDialog = (user) => {
    setSelectedUser(user);
    setOpenUserDialog(true);
  };

  const handleOpenAddDialog = () => {
    setOpenAddDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenUserDialog(false);
    setOpenAddDialog(false);
    setSelectedUser(null);
  };

  const handleChangeTab = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (selectedUser) {
      setSelectedUser({
        ...selectedUser,
        [name]: value,
      });
    } else {
      setNewUser({
        ...newUser,
        [name]: value,
      });
    }
  };

  const handleSaveUser = () => {
    if (selectedUser) {
      // Update existing user
      setUsers(
        users.map((user) => (user.id === selectedUser.id ? selectedUser : user))
      );
    } else if (openAddDialog) {
      // Add new user
      const newUserWithId = {
        ...newUser,
        id: users.length + 1,
        avatar: "",
        joinDate: new Date().toISOString().split("T")[0],
        totalOrders: 0,
        totalSpent: 0,
        orderHistory: [],
      };
      setUsers([...users, newUserWithId]);
    }
    handleCloseDialog();
  };

  const handleDeleteUser = (id) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  const getStatusChipColor = (status) => {
    return status === "Active" ? "success" : "error";
  };

  const getRoleChipColor = (role) => {
    switch (role) {
      case "Admin":
        return "primary";
      case "Weaver":
        return "secondary";
      case "Customer":
        return "info";
      default:
        return "default";
    }
  };

  // Filter users based on search term, role, and status
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === "All" || user.role === roleFilter;
    const matchesStatus =
      statusFilter === "All" || user.status === statusFilter;
    return matchesSearch && matchesRole && matchesStatus;
  });

  // Pagination
  const paginatedUsers = filteredUsers.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  // Get user initials for avatar
  const getUserInitials = (name) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

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
          User Management
        </Typography>
        <Button
          variant="contained"
          startIcon={<PersonAdd />}
          onClick={handleOpenAddDialog}
          sx={{ bgcolor: "#D5A419", "&:hover": { bgcolor: "#B58A14" }, px: 3 }}
        >
          Add User
        </Button>
      </Box>

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
          placeholder="Search users..."
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
          <InputLabel id="role-filter-label">Role</InputLabel>
          <Select
            labelId="role-filter-label"
            value={roleFilter}
            label="Role"
            onChange={handleRoleFilterChange}
          >
            {roles.map((role) => (
              <MenuItem key={role} value={role}>
                {role}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl size="small" sx={{ minWidth: 150 }}>
          <InputLabel id="status-filter-label">Status</InputLabel>
          <Select
            labelId="status-filter-label"
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

      {/* Users Table */}
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
                <TableCell>User</TableCell>
                <TableCell>Contact</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Joined</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedUsers.map((user) => (
                <TableRow key={user.id} hover>
                  <TableCell>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Avatar
                        sx={{
                          bgcolor: getRoleChipColor(user.role)
                            .replace("primary", "#2196F3")
                            .replace("secondary", "#9C27B0")
                            .replace("info", "#03A9F4")
                            .replace("success", "#4CAF50")
                            .replace("error", "#F44336")
                            .replace("default", "#757575"),
                          mr: 2,
                        }}
                      >
                        {getUserInitials(user.name)}
                      </Avatar>
                      <Box>
                        <Typography variant="body1" sx={{ fontWeight: 500 }}>
                          {user.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {user.email}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell>{user.phone}</TableCell>
                  <TableCell>
                    <Chip
                      label={user.role}
                      color={getRoleChipColor(user.role)}
                      size="small"
                      variant="outlined"
                    />
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={user.status}
                      color={getStatusChipColor(user.status)}
                      size="small"
                      variant="outlined"
                    />
                  </TableCell>
                  <TableCell>
                    {new Date(user.joinDate).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </TableCell>
                  <TableCell align="right">
                    <Tooltip title="View Details">
                      <IconButton
                        size="small"
                        onClick={() => handleOpenUserDialog(user)}
                        color="primary"
                      >
                        <Visibility fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Edit">
                      <IconButton
                        size="small"
                        onClick={() => handleOpenUserDialog(user)}
                        sx={{ color: "#2196F3", mx: 1 }}
                      >
                        <Edit fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton
                        size="small"
                        onClick={() => handleDeleteUser(user.id)}
                        sx={{ color: "#F44336" }}
                        disabled={user.role === "Admin"}
                      >
                        <Delete fontSize="small" />
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
          count={filteredUsers.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>

      {/* User Details Dialog */}
      <Dialog
        open={openUserDialog}
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
            <Typography variant="h6">User Details</Typography>
            <IconButton size="small" onClick={handleCloseDialog}>
              <Close fontSize="small" />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent dividers>
          {selectedUser && (
            <Box>
              <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 3 }}>
                <Tabs
                  value={tabValue}
                  onChange={handleChangeTab}
                  aria-label="user tabs"
                >
                  <Tab label="Profile" />
                  <Tab label="Order History" />
                </Tabs>
              </Box>

              {/* Profile Tab */}
              {tabValue === 0 && (
                <Grid container spacing={3}>
                  <Grid item xs={12} md={4}>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        mb: 3,
                      }}
                    >
                      <Avatar
                        sx={{
                          width: 120,
                          height: 120,
                          fontSize: "3rem",
                          mb: 2,
                          bgcolor: getRoleChipColor(selectedUser.role)
                            .replace("primary", "#2196F3")
                            .replace("secondary", "#9C27B0")
                            .replace("info", "#03A9F4"),
                        }}
                      >
                        {getUserInitials(selectedUser.name)}
                      </Avatar>
                      <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        {selectedUser.name}
                      </Typography>
                      <Chip
                        label={selectedUser.role}
                        color={getRoleChipColor(selectedUser.role)}
                        size="small"
                        sx={{ mt: 1 }}
                      />
                    </Box>
                    <Divider sx={{ mb: 2 }} />
                    {selectedUser.role === "Customer" && (
                      <Box sx={{ mb: 3 }}>
                        <Typography
                          variant="subtitle1"
                          sx={{ fontWeight: 600, mb: 1 }}
                        >
                          Customer Statistics
                        </Typography>
                        <Grid container spacing={2}>
                          <Grid item xs={6}>
                            <Paper
                              sx={{
                                p: 2,
                                textAlign: "center",
                                bgcolor: "rgba(33, 150, 243, 0.1)",
                              }}
                            >
                              <Typography variant="h6" color="primary">
                                {selectedUser.totalOrders}
                              </Typography>
                              <Typography
                                variant="body2"
                                color="text.secondary"
                              >
                                Orders
                              </Typography>
                            </Paper>
                          </Grid>
                          <Grid item xs={6}>
                            <Paper
                              sx={{
                                p: 2,
                                textAlign: "center",
                                bgcolor: "rgba(76, 175, 80, 0.1)",
                              }}
                            >
                              <Typography variant="h6" color="success.main">
                                ₹{selectedUser.totalSpent.toLocaleString()}
                              </Typography>
                              <Typography
                                variant="body2"
                                color="text.secondary"
                              >
                                Total Spent
                              </Typography>
                            </Paper>
                          </Grid>
                        </Grid>
                      </Box>
                    )}
                  </Grid>
                  <Grid item xs={12} md={8}>
                    <Typography
                      variant="subtitle1"
                      sx={{ fontWeight: 600, mb: 2 }}
                    >
                      Personal Information
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          label="Full Name"
                          name="name"
                          value={selectedUser.name}
                          onChange={handleInputChange}
                          fullWidth
                          margin="normal"
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          label="Email"
                          name="email"
                          value={selectedUser.email}
                          onChange={handleInputChange}
                          fullWidth
                          margin="normal"
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <Email fontSize="small" />
                              </InputAdornment>
                            ),
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          label="Phone"
                          name="phone"
                          value={selectedUser.phone}
                          onChange={handleInputChange}
                          fullWidth
                          margin="normal"
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <Phone fontSize="small" />
                              </InputAdornment>
                            ),
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <FormControl fullWidth margin="normal">
                          <InputLabel>Role</InputLabel>
                          <Select
                            name="role"
                            value={selectedUser.role}
                            label="Role"
                            onChange={handleInputChange}
                          >
                            {roles
                              .filter((role) => role !== "All")
                              .map((role) => (
                                <MenuItem key={role} value={role}>
                                  {role}
                                </MenuItem>
                              ))}
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <FormControl fullWidth margin="normal">
                          <InputLabel>Status</InputLabel>
                          <Select
                            name="status"
                            value={selectedUser.status}
                            label="Status"
                            onChange={handleInputChange}
                          >
                            {statuses
                              .filter((status) => status !== "All")
                              .map((status) => (
                                <MenuItem key={status} value={status}>
                                  {status}
                                </MenuItem>
                              ))}
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          label="Address"
                          name="address"
                          value={selectedUser.address}
                          onChange={handleInputChange}
                          fullWidth
                          margin="normal"
                          multiline
                          rows={2}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              )}

              {/* Order History Tab */}
              {tabValue === 1 && (
                <Box>
                  {selectedUser.role === "Customer" ? (
                    <>
                      <Typography
                        variant="subtitle1"
                        sx={{ fontWeight: 600, mb: 2 }}
                      >
                        Order History
                      </Typography>
                      {selectedUser.orderHistory.length > 0 ? (
                        <TableContainer component={Paper} variant="outlined">
                          <Table>
                            <TableHead>
                              <TableRow sx={{ bgcolor: "rgba(0,0,0,0.03)" }}>
                                <TableCell>Order ID</TableCell>
                                <TableCell>Date</TableCell>
                                <TableCell align="right">Amount</TableCell>
                                <TableCell>Status</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {selectedUser.orderHistory.map((order) => (
                                <TableRow key={order.id} hover>
                                  <TableCell sx={{ fontWeight: 500 }}>
                                    {order.id}
                                  </TableCell>
                                  <TableCell>
                                    {new Date(order.date).toLocaleDateString(
                                      "en-IN",
                                      {
                                        day: "numeric",
                                        month: "short",
                                        year: "numeric",
                                      }
                                    )}
                                  </TableCell>
                                  <TableCell align="right">
                                    ₹{order.amount.toLocaleString()}
                                  </TableCell>
                                  <TableCell>
                                    <Chip
                                      label={order.status}
                                      color={
                                        order.status === "Delivered"
                                          ? "success"
                                          : order.status === "Shipped"
                                          ? "info"
                                          : order.status === "Processing"
                                          ? "warning"
                                          : "primary"
                                      }
                                      size="small"
                                      variant="outlined"
                                    />
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </TableContainer>
                      ) : (
                        <Typography
                          color="text.secondary"
                          sx={{ textAlign: "center", py: 4 }}
                        >
                          No orders found for this customer.
                        </Typography>
                      )}
                    </>
                  ) : (
                    <Typography
                      color="text.secondary"
                      sx={{ textAlign: "center", py: 4 }}
                    >
                      Order history is only available for Customer accounts.
                    </Typography>
                  )}
                </Box>
              )}
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
            onClick={handleSaveUser}
            variant="contained"
            sx={{ bgcolor: "#D5A419", "&:hover": { bgcolor: "#B58A14" } }}
          >
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>

      {/* Add User Dialog */}
      <Dialog
        open={openAddDialog}
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
            <Typography variant="h6">Add New User</Typography>
            <IconButton size="small" onClick={handleCloseDialog}>
              <Close fontSize="small" />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Full Name"
                name="name"
                value={newUser.name}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Email"
                name="email"
                type="email"
                value={newUser.email}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Email fontSize="small" />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Phone"
                name="phone"
                value={newUser.phone}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Phone fontSize="small" />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth margin="normal" required>
                <InputLabel>Role</InputLabel>
                <Select
                  name="role"
                  value={newUser.role}
                  label="Role"
                  onChange={handleInputChange}
                >
                  {roles
                    .filter((role) => role !== "All")
                    .map((role) => (
                      <MenuItem key={role} value={role}>
                        {role}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth margin="normal" required>
                <InputLabel>Status</InputLabel>
                <Select
                  name="status"
                  value={newUser.status}
                  label="Status"
                  onChange={handleInputChange}
                >
                  {statuses
                    .filter((status) => status !== "All")
                    .map((status) => (
                      <MenuItem key={status} value={status}>
                        {status}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Address"
                name="address"
                value={newUser.address}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
                multiline
                rows={2}
              />
            </Grid>
          </Grid>
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
            onClick={handleSaveUser}
            variant="contained"
            sx={{ bgcolor: "#D5A419", "&:hover": { bgcolor: "#B58A14" } }}
            disabled={!newUser.name || !newUser.email || !newUser.phone}
          >
            Add User
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default UserManagement;
