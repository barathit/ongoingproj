import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
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
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TablePagination,
  Tooltip,
  InputAdornment,
} from "@mui/material";
import {
  Edit,
  Delete,
  Add,
  Search,
  PhotoCamera,
  Close,
  FilterList,
} from "@mui/icons-material";

// Mock data for sarees
const mockSarees = [
  {
    id: 1,
    name: "Kanchipuram Silk Saree",
    category: "Silk",
    price: 15800,
    stock: 12,
    image: "https://images.pexels.com/photos/2995309/pexels-photo-2995309.jpeg",
    status: "Active",
  },
  {
    id: 2,
    name: "Banarasi Silk Saree",
    category: "Silk",
    price: 12500,
    stock: 8,
    image: "https://images.pexels.com/photos/2983464/pexels-photo-2983464.jpeg",
    status: "Active",
  },
  {
    id: 3,
    name: "Mysore Silk Saree",
    category: "Silk",
    price: 9800,
    stock: 15,
    image: "https://images.pexels.com/photos/4612722/pexels-photo-4612722.jpeg",
    status: "Active",
  },
  {
    id: 4,
    name: "Cotton Handloom Saree",
    category: "Cotton",
    price: 4200,
    stock: 20,
    image: "https://images.pexels.com/photos/7690207/pexels-photo-7690207.jpeg",
    status: "Active",
  },
  {
    id: 5,
    name: "Pochampally Ikat Saree",
    category: "Ikat",
    price: 7500,
    stock: 10,
    image: "https://images.pexels.com/photos/9969070/pexels-photo-9969070.jpeg",
    status: "Low Stock",
  },
  {
    id: 6,
    name: "Patola Silk Saree",
    category: "Silk",
    price: 18000,
    stock: 5,
    image: "https://images.pexels.com/photos/6567607/pexels-photo-6567607.jpeg",
    status: "Low Stock",
  },
  {
    id: 7,
    name: "Chanderi Cotton Silk Saree",
    category: "Mixed",
    price: 6500,
    stock: 0,
    image: "https://images.pexels.com/photos/7389918/pexels-photo-7389918.jpeg",
    status: "Out of Stock",
  },
  {
    id: 8,
    name: "Tussar Silk Saree",
    category: "Silk",
    price: 8900,
    stock: 7,
    image: "https://images.pexels.com/photos/6567732/pexels-photo-6567732.jpeg",
    status: "Active",
  },
];

const SareeManagement = () => {
  const [sarees, setSarees] = useState(mockSarees);
  const [searchTerm, setSearchTerm] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [currentSaree, setCurrentSaree] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  // Categories for filtering
  const categories = ["All", "Silk", "Cotton", "Ikat", "Mixed"];
  const statuses = ["All", "Active", "Low Stock", "Out of Stock"];

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleAddSaree = () => {
    setCurrentSaree({
      id: sarees.length + 1,
      name: "",
      category: "",
      price: 0,
      stock: 0,
      image: "",
      status: "Active",
    });
    setOpenDialog(true);
  };

  const handleEditSaree = (saree) => {
    setCurrentSaree({ ...saree });
    setOpenDialog(true);
  };

  const handleDeleteSaree = (id) => {
    setSarees(sarees.filter((saree) => saree.id !== id));
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setCurrentSaree(null);
  };

  const handleSaveSaree = () => {
    if (currentSaree) {
      if (sarees.some((saree) => saree.id === currentSaree.id)) {
        // Update existing saree
        setSarees(
          sarees.map((saree) =>
            saree.id === currentSaree.id ? currentSaree : saree
          )
        );
      } else {
        // Add new saree
        setSarees([...sarees, currentSaree]);
      }
    }
    handleCloseDialog();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentSaree({
      ...currentSaree,
      [name]: name === "price" || name === "stock" ? Number(value) : value,
    });
  };

  const getStatusChipColor = (status) => {
    switch (status) {
      case "Active":
        return "success";
      case "Low Stock":
        return "warning";
      case "Out of Stock":
        return "error";
      default:
        return "default";
    }
  };

  // Filter sarees based on search term, category, and status
  const filteredSarees = sarees.filter((saree) => {
    const matchesSearch = saree.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      categoryFilter === "All" || saree.category === categoryFilter;
    const matchesStatus =
      statusFilter === "All" || saree.status === statusFilter;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  // Pagination
  const paginatedSarees = filteredSarees.slice(
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
          Saree Management
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<Add />}
          onClick={handleAddSaree}
          sx={{
            bgcolor: "#D5A419",
            "&:hover": { bgcolor: "#B58A14" },
            px: 3,
          }}
        >
          Add Saree
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
          placeholder="Search sarees..."
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
          <InputLabel id="category-filter-label">Category</InputLabel>
          <Select
            labelId="category-filter-label"
            value={categoryFilter}
            label="Category"
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            {categories.map((category) => (
              <MenuItem key={category} value={category}>
                {category}
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
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            {statuses.map((status) => (
              <MenuItem key={status} value={status}>
                {status}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Paper>

      {/* Sarees Table */}
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
                <TableCell>Image</TableCell>
                <TableCell>Saree Name</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Price (₹)</TableCell>
                <TableCell>Stock</TableCell>
                <TableCell>Status</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedSarees.map((saree) => (
                <TableRow key={saree.id} hover>
                  <TableCell>
                    <Box
                      component="img"
                      src={saree.image}
                      alt={saree.name}
                      sx={{
                        width: 60,
                        height: 60,
                        borderRadius: 1,
                        objectFit: "cover",
                      }}
                    />
                  </TableCell>
                  <TableCell sx={{ fontWeight: 500 }}>{saree.name}</TableCell>
                  <TableCell>{saree.category}</TableCell>
                  <TableCell>₹{saree.price.toLocaleString()}</TableCell>
                  <TableCell>{saree.stock}</TableCell>
                  <TableCell>
                    <Chip
                      label={saree.status}
                      color={getStatusChipColor(saree.status)}
                      size="small"
                      variant="outlined"
                    />
                  </TableCell>
                  <TableCell align="right">
                    <Tooltip title="Edit">
                      <IconButton
                        size="small"
                        onClick={() => handleEditSaree(saree)}
                        sx={{ color: "#2196F3" }}
                      >
                        <Edit fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton
                        size="small"
                        onClick={() => handleDeleteSaree(saree.id)}
                        sx={{ color: "#F44336", ml: 1 }}
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
          count={filteredSarees.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>

      {/* Add/Edit Saree Dialog */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle sx={{ pb: 1 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            {currentSaree?.id && sarees.some((s) => s.id === currentSaree.id)
              ? "Edit Saree"
              : "Add New Saree"}
            <IconButton size="small" onClick={handleCloseDialog}>
              <Close fontSize="small" />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent dividers>
          {currentSaree && (
            <Grid container spacing={3}>
              <Grid item xs={12} md={4}>
                <Box
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    p: 2,
                  }}
                >
                  <Box
                    sx={{
                      width: "100%",
                      height: 200,
                      bgcolor: "rgba(0,0,0,0.03)",
                      borderRadius: 2,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      mb: 2,
                      backgroundImage: currentSaree.image
                        ? `url(${currentSaree.image})`
                        : "none",
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  >
                    {!currentSaree.image && (
                      <PhotoCamera
                        sx={{ fontSize: 40, color: "text.secondary" }}
                      />
                    )}
                  </Box>
                  <Button
                    variant="outlined"
                    component="label"
                    startIcon={<PhotoCamera />}
                  >
                    Upload Image
                    <input type="file" hidden />
                  </Button>
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{ mt: 2, textAlign: "center" }}
                  >
                    Recommended size: 800x800 pixels. Max file size: 2MB
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} md={8}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      name="name"
                      label="Saree Name"
                      value={currentSaree.name}
                      onChange={handleInputChange}
                      fullWidth
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth required>
                      <InputLabel>Category</InputLabel>
                      <Select
                        name="category"
                        value={currentSaree.category}
                        label="Category"
                        onChange={handleInputChange}
                      >
                        {categories
                          .filter((cat) => cat !== "All")
                          .map((category) => (
                            <MenuItem key={category} value={category}>
                              {category}
                            </MenuItem>
                          ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      name="price"
                      label="Price (₹)"
                      type="number"
                      value={currentSaree.price}
                      onChange={handleInputChange}
                      fullWidth
                      required
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">₹</InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      name="stock"
                      label="Stock"
                      type="number"
                      value={currentSaree.stock}
                      onChange={handleInputChange}
                      fullWidth
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth required>
                      <InputLabel>Status</InputLabel>
                      <Select
                        name="status"
                        value={currentSaree.status}
                        label="Status"
                        onChange={handleInputChange}
                      >
                        {statuses
                          .filter((stat) => stat !== "All")
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
                      name="description"
                      label="Description"
                      multiline
                      rows={4}
                      value={currentSaree.description || ""}
                      onChange={handleInputChange}
                      fullWidth
                    />
                  </Grid>
                </Grid>
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
            Cancel
          </Button>
          <Button
            onClick={handleSaveSaree}
            variant="contained"
            sx={{
              bgcolor: "#D5A419",
              "&:hover": { bgcolor: "#B58A14" },
            }}
          >
            Save Saree
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default SareeManagement;
