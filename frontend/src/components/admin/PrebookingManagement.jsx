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
} from "@mui/material";
import {
  Search,
  Edit,
  Visibility,
  Close,
  CheckCircle,
  Cancel,
  Schedule,
} from "@mui/icons-material";

// Mock data for prebookings
const mockPrebookings = [
  {
    id: "PRE001",
    customerName: "Priya Sharma",
    sareeType: "Kanchipuram Silk",
    customizations: "Gold zari border, peacock motifs",
    status: "Pending",
    requestDate: "2024-03-15",
    expectedDelivery: "2024-05-15",
    amount: 35000,
    weaverAssigned: "",
  },
  {
    id: "PRE002",
    customerName: "Meera Patel",
    sareeType: "Banarasi Silk",
    customizations: "Silver zari work, floral design",
    status: "Confirmed",
    requestDate: "2024-03-10",
    expectedDelivery: "2024-05-01",
    amount: 42000,
    weaverAssigned: "Ramesh Kumar",
  },
  {
    id: "PRE003",
    customerName: "Anjali Singh",
    sareeType: "Mysore Silk",
    customizations: "Temple border, traditional motifs",
    status: "In Progress",
    requestDate: "2024-03-05",
    expectedDelivery: "2024-04-20",
    amount: 28000,
    weaverAssigned: "Suresh Yadav",
  },
];

const PrebookingManagement = () => {
  const [prebookings, setPrebookings] = useState(mockPrebookings);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPrebooking, setSelectedPrebooking] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [statusFilter, setStatusFilter] = useState("All");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const statuses = [
    "All",
    "Pending",
    "Confirmed",
    "In Progress",
    "Completed",
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

  const handleOpenDialog = (prebooking) => {
    setSelectedPrebooking(prebooking);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedPrebooking(null);
  };

  const handleUpdateStatus = (id, newStatus) => {
    setPrebookings(
      prebookings.map((prebooking) =>
        prebooking.id === id ? { ...prebooking, status: newStatus } : prebooking
      )
    );
  };

  const getStatusChipColor = (status) => {
    switch (status) {
      case "Pending":
        return "warning";
      case "Confirmed":
        return "info";
      case "In Progress":
        return "primary";
      case "Completed":
        return "success";
      case "Cancelled":
        return "error";
      default:
        return "default";
    }
  };

  // Filter prebookings based on search term and status
  const filteredPrebookings = prebookings.filter((prebooking) => {
    const matchesSearch =
      prebooking.customerName
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      prebooking.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "All" || prebooking.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Pagination
  const paginatedPrebookings = filteredPrebookings.slice(
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
          Prebooking Management
        </Typography>
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
          placeholder="Search prebookings..."
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

      {/* Prebookings Table */}
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
                <TableCell>Prebooking ID</TableCell>
                <TableCell>Customer</TableCell>
                <TableCell>Saree Type</TableCell>
                <TableCell>Request Date</TableCell>
                <TableCell>Expected Delivery</TableCell>
                <TableCell>Status</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedPrebookings.map((prebooking) => (
                <TableRow key={prebooking.id} hover>
                  <TableCell sx={{ fontWeight: 500 }}>
                    {prebooking.id}
                  </TableCell>
                  <TableCell>{prebooking.customerName}</TableCell>
                  <TableCell>{prebooking.sareeType}</TableCell>
                  <TableCell>
                    {new Date(prebooking.requestDate).toLocaleDateString(
                      "en-IN",
                      {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      }
                    )}
                  </TableCell>
                  <TableCell>
                    {new Date(prebooking.expectedDelivery).toLocaleDateString(
                      "en-IN",
                      {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      }
                    )}
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={prebooking.status}
                      color={getStatusChipColor(prebooking.status)}
                      size="small"
                    />
                  </TableCell>
                  <TableCell align="right">
                    <Tooltip title="View Details">
                      <IconButton
                        size="small"
                        onClick={() => handleOpenDialog(prebooking)}
                        color="primary"
                      >
                        <Visibility fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    {prebooking.status === "Pending" && (
                      <>
                        <Tooltip title="Confirm">
                          <IconButton
                            size="small"
                            onClick={() =>
                              handleUpdateStatus(prebooking.id, "Confirmed")
                            }
                            sx={{ color: "#2196F3", mx: 1 }}
                          >
                            <CheckCircle fontSize="small" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Cancel">
                          <IconButton
                            size="small"
                            onClick={() =>
                              handleUpdateStatus(prebooking.id, "Cancelled")
                            }
                            sx={{ color: "#F44336" }}
                          >
                            <Cancel fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      </>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredPrebookings.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>

      {/* Prebooking Details Dialog */}
      <Dialog
        open={openDialog}
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
            <Typography variant="h6">Prebooking Details</Typography>
            <IconButton size="small" onClick={handleCloseDialog}>
              <Close fontSize="small" />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent dividers>
          {selectedPrebooking && (
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2" color="text.secondary">
                  Prebooking ID
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 500, mb: 2 }}>
                  {selectedPrebooking.id}
                </Typography>

                <Typography variant="subtitle2" color="text.secondary">
                  Customer Name
                </Typography>
                <Typography variant="body1" sx={{ mb: 2 }}>
                  {selectedPrebooking.customerName}
                </Typography>

                <Typography variant="subtitle2" color="text.secondary">
                  Saree Type
                </Typography>
                <Typography variant="body1" sx={{ mb: 2 }}>
                  {selectedPrebooking.sareeType}
                </Typography>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2" color="text.secondary">
                  Request Date
                </Typography>
                <Typography variant="body1" sx={{ mb: 2 }}>
                  {new Date(selectedPrebooking.requestDate).toLocaleDateString(
                    "en-IN",
                    {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    }
                  )}
                </Typography>

                <Typography variant="subtitle2" color="text.secondary">
                  Expected Delivery
                </Typography>
                <Typography variant="body1" sx={{ mb: 2 }}>
                  {new Date(
                    selectedPrebooking.expectedDelivery
                  ).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </Typography>

                <Typography variant="subtitle2" color="text.secondary">
                  Amount
                </Typography>
                <Typography variant="body1" sx={{ mb: 2 }}>
                  ₹{selectedPrebooking.amount.toLocaleString()}
                </Typography>
              </Grid>

              <Grid item xs={12}>
                <Typography variant="subtitle2" color="text.secondary">
                  Customizations
                </Typography>
                <Typography variant="body1" sx={{ mb: 2 }}>
                  {selectedPrebooking.customizations}
                </Typography>
              </Grid>

              <Grid item xs={12}>
                <Typography variant="subtitle2" color="text.secondary">
                  Weaver Assigned
                </Typography>
                <Typography variant="body1" sx={{ mb: 2 }}>
                  {selectedPrebooking.weaverAssigned || "Not assigned yet"}
                </Typography>
              </Grid>

              <Grid item xs={12}>
                <Box sx={{ mt: 2 }}>
                  <Typography
                    variant="subtitle1"
                    sx={{ fontWeight: 600, mb: 2 }}
                  >
                    Update Status
                  </Typography>
                  <Box sx={{ display: "flex", gap: 1 }}>
                    {selectedPrebooking.status !== "Completed" && (
                      <Button
                        variant="outlined"
                        color="primary"
                        startIcon={<CheckCircle />}
                        onClick={() => {
                          handleUpdateStatus(
                            selectedPrebooking.id,
                            "Completed"
                          );
                          handleCloseDialog();
                        }}
                      >
                        Mark as Completed
                      </Button>
                    )}
                    {selectedPrebooking.status === "Pending" && (
                      <>
                        <Button
                          variant="outlined"
                          color="info"
                          startIcon={<Schedule />}
                          onClick={() => {
                            handleUpdateStatus(
                              selectedPrebooking.id,
                              "In Progress"
                            );
                            handleCloseDialog();
                          }}
                        >
                          Start Production
                        </Button>
                        <Button
                          variant="outlined"
                          color="error"
                          startIcon={<Cancel />}
                          onClick={() => {
                            handleUpdateStatus(
                              selectedPrebooking.id,
                              "Cancelled"
                            );
                            handleCloseDialog();
                          }}
                        >
                          Cancel Prebooking
                        </Button>
                      </>
                    )}
                  </Box>
                </Box>
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

export default PrebookingManagement;
