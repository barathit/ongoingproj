import React, { useState, useEffect } from "react";
import {
  Container,
  Grid,
  Box,
  Typography,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Slider,
  Pagination,
  Skeleton,
  Chip,
  Paper,
  Divider,
  InputAdornment,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
  Tab,
  Tabs,
  CircularProgress,
  Autocomplete,
  Checkbox,
  Rating,
} from "@mui/material";
import {
  Search,
  Close,
  FilterList,
  Sort,
  CompareArrows,
  Compare,
} from "@mui/icons-material";
import { useMockServices } from "../mocks/mockServiceProvider";
import Product from "../components/Product";
import { motion } from "framer-motion";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";

const Shop = () => {
  const { products, loading } = useMockServices();
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchSuggestions, setSearchSuggestions] = useState([]);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(12);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [compareMode, setCompareMode] = useState(false);
  const [productsToCompare, setProductsToCompare] = useState([]);

  // Filter states
  const [filters, setFilters] = useState({
    category: "all",
    priceRange: [0, 50000],
    sortBy: "newest",
    customizable: false,
    newArrivals: false,
    inStock: true,
  });

  // Category options
  const categories = [
    { id: "all", name: "All Categories" },
    { id: "sarees", name: "Sarees" },
    { id: "kurtis", name: "Kurtis" },
    { id: "accessories", name: "Accessories" },
    { id: "silk", name: "Silk Sarees" },
    { id: "cotton", name: "Cotton Sarees" },
    { id: "linen", name: "Linen Sarees" },
    { id: "handloom", name: "Handloom Sarees" },
  ];

  // Sort options
  const sortOptions = [
    { id: "newest", name: "New Arrivals" },
    { id: "price_low", name: "Price: Low to High" },
    { id: "price_high", name: "Price: High to Low" },
    { id: "best_selling", name: "Best Selling" },
    { id: "rating", name: "Customer Ratings" },
  ];

  useEffect(() => {
    if (products.length > 0) {
      applyFilters();
    }
  }, [products, filters, searchTerm, page]);

  useEffect(() => {
    if (searchTerm) {
      const suggestions = products
        .filter(
          (product) =>
            product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (product.description &&
              product.description
                .toLowerCase()
                .includes(searchTerm.toLowerCase()))
        )
        .map((product) => product.name)
        .slice(0, 5);
      setSearchSuggestions(suggestions);
    } else {
      setSearchSuggestions([]);
    }
  }, [searchTerm, products]);

  const applyFilters = () => {
    let result = [...products];

    // Apply search filter
    if (searchTerm) {
      result = result.filter(
        (product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (product.description &&
            product.description
              .toLowerCase()
              .includes(searchTerm.toLowerCase()))
      );
    }

    // Apply category filter
    if (filters.category !== "all") {
      result = result.filter(
        (product) =>
          product.category &&
          product.category
            .toLowerCase()
            .includes(filters.category.toLowerCase())
      );
    }

    // Apply price range filter
    result = result.filter((product) => {
      const price = product.discountPrice || product.price;
      return price >= filters.priceRange[0] && price <= filters.priceRange[1];
    });

    // Apply customizable filter
    if (filters.customizable) {
      result = result.filter((product) => product.customizable);
    }

    // Apply new arrivals filter
    if (filters.newArrivals) {
      result = result.filter((product) => product.isNew);
    }

    // Apply in stock filter
    if (filters.inStock) {
      result = result.filter((product) => product.inStock !== false);
    }

    // Apply sorting
    result = sortProducts(result, filters.sortBy);

    setFilteredProducts(result);
  };

  const sortProducts = (products, sortBy) => {
    const sortedProducts = [...products];

    switch (sortBy) {
      case "price_low":
        return sortedProducts.sort(
          (a, b) => (a.discountPrice || a.price) - (b.discountPrice || b.price)
        );
      case "price_high":
        return sortedProducts.sort(
          (a, b) => (b.discountPrice || b.price) - (a.discountPrice || a.price)
        );
      case "best_selling":
        return sortedProducts.sort(
          (a, b) => (b.salesCount || 0) - (a.salesCount || 0)
        );
      case "rating":
        return sortedProducts.sort((a, b) => (b.rating || 0) - (a.rating || 0));
      case "newest":
      default:
        return sortedProducts.sort(
          (a, b) =>
            new Date(b.createdAt || Date.now()) -
            new Date(a.createdAt || Date.now())
        );
    }
  };

  const handleFilterChange = (field, value) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
    setPage(1);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setPage(1);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleQuickView = (product) => {
    setQuickViewProduct(product);
  };

  const handleCloseQuickView = () => {
    setQuickViewProduct(null);
  };

  // Pagination calculations
  const startIndex = (page - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const paginatedProducts = filteredProducts.slice(startIndex, endIndex);
  const totalPages = Math.ceil(filteredProducts.length / rowsPerPage);

  const toggleProductCompare = (product) => {
    setProductsToCompare((current) => {
      // If product is already in the compare list, remove it
      if (current.some((p) => p.id === product.id)) {
        return current.filter((p) => p.id !== product.id);
      }

      // If adding would exceed 3 products, show first 2 plus new selection
      if (current.length >= 3) {
        return [...current.slice(0, 2), product];
      }

      // Otherwise add the product
      return [...current, product];
    });
  };

  const isInCompareList = (productId) => {
    return productsToCompare.some((p) => p.id === productId);
  };

  const handleCompareToggle = () => {
    if (compareMode) {
      // Exit compare mode
      setCompareMode(false);
      setProductsToCompare([]);
    } else {
      // Enter compare mode if we have products
      if (productsToCompare.length > 0) {
        setCompareMode(true);
      }
    }
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" sx={{ mb: 3, fontWeight: 600 }}>
        Collections
      </Typography>

      {/* Search & Filter Section */}
      <Paper
        elevation={0}
        sx={{
          p: 3,
          mb: 4,
          borderRadius: 2,
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        }}
      >
        <Grid container spacing={3}>
          {/* Search */}
          <Grid item xs={12} md={6}>
            <Autocomplete
              freeSolo
              options={searchSuggestions}
              inputValue={searchTerm}
              onInputChange={(event, newValue) => setSearchTerm(newValue)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Search products"
                  variant="outlined"
                  fullWidth
                  InputProps={{
                    ...params.InputProps,
                    startAdornment: (
                      <InputAdornment position="start">
                        <Search />
                      </InputAdornment>
                    ),
                  }}
                />
              )}
            />
          </Grid>

          {/* Category Filter */}
          <Grid item xs={12} sm={6} md={3}>
            <FormControl fullWidth>
              <InputLabel>Category</InputLabel>
              <Select
                value={filters.category}
                label="Category"
                onChange={(e) => handleFilterChange("category", e.target.value)}
              >
                {categories.map((category) => (
                  <MenuItem key={category.id} value={category.id}>
                    {category.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          {/* Sort */}
          <Grid item xs={12} sm={6} md={3}>
            <FormControl fullWidth>
              <InputLabel>Sort By</InputLabel>
              <Select
                value={filters.sortBy}
                label="Sort By"
                onChange={(e) => handleFilterChange("sortBy", e.target.value)}
              >
                {sortOptions.map((option) => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          {/* Price Range Filter */}
          <Grid item xs={12}>
            <Typography variant="subtitle1" gutterBottom>
              Price Range
            </Typography>
            <Slider
              value={filters.priceRange}
              onChange={(e, newValue) =>
                handleFilterChange("priceRange", newValue)
              }
              valueLabelDisplay="auto"
              min={0}
              max={50000}
              step={500}
              valueLabelFormat={(value) => `₹${value.toLocaleString()}`}
            />
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography variant="body2" color="text.secondary">
                ₹{filters.priceRange[0].toLocaleString()}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                ₹{filters.priceRange[1].toLocaleString()}
              </Typography>
            </Box>
          </Grid>

          {/* Feature Filters */}
          <Grid item xs={12}>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
              <Chip
                label="New Arrivals"
                color={filters.newArrivals ? "primary" : "default"}
                onClick={() =>
                  handleFilterChange("newArrivals", !filters.newArrivals)
                }
                variant={filters.newArrivals ? "filled" : "outlined"}
              />
              <Chip
                label="Customizable"
                color={filters.customizable ? "primary" : "default"}
                onClick={() =>
                  handleFilterChange("customizable", !filters.customizable)
                }
                variant={filters.customizable ? "filled" : "outlined"}
              />
              <Chip
                label="In Stock"
                color={filters.inStock ? "primary" : "default"}
                onClick={() => handleFilterChange("inStock", !filters.inStock)}
                variant={filters.inStock ? "filled" : "outlined"}
              />
            </Box>
          </Grid>
        </Grid>
      </Paper>

      {/* Product Count & Filter Results */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography>
          Showing {filteredProducts.length}{" "}
          {filteredProducts.length === 1 ? "product" : "products"}
        </Typography>
        <Button
          startIcon={<FilterList />}
          onClick={() => handleFilterChange("category", "all")}
          disabled={filters.category === "all"}
        >
          Clear Filters
        </Button>
      </Box>

      {/* Products Grid */}
      {loading ? (
        <Grid container spacing={3}>
          {[...Array(8)].map((_, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <Skeleton variant="rectangular" height={320} />
              <Skeleton variant="text" sx={{ mt: 1 }} />
              <Skeleton variant="text" width="60%" />
            </Grid>
          ))}
        </Grid>
      ) : filteredProducts.length === 0 ? (
        <Box sx={{ textAlign: "center", py: 5 }}>
          <Typography variant="h6" color="text.secondary">
            No products found matching your criteria
          </Typography>
          <Button
            variant="contained"
            onClick={() => {
              setFilters({
                category: "all",
                priceRange: [0, 50000],
                sortBy: "newest",
                customizable: false,
                newArrivals: false,
                inStock: true,
              });
              setSearchTerm("");
            }}
            sx={{ mt: 2 }}
          >
            Reset Filters
          </Button>
        </Box>
      ) : (
        <Grid container spacing={3}>
          {paginatedProducts.map((product) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
              <Box position="relative">
                {/* Compare checkbox on top of product card */}
                <Checkbox
                  checked={isInCompareList(product.id)}
                  onChange={() => toggleProductCompare(product)}
                  sx={{
                    position: "absolute",
                    top: 5,
                    right: 5,
                    zIndex: 1,
                    bgcolor: "rgba(255,255,255,0.7)",
                    "&:hover": { bgcolor: "rgba(255,255,255,0.9)" },
                    borderRadius: "50%",
                  }}
                  icon={<Compare />}
                  checkedIcon={<Compare color="primary" />}
                />
                <Product product={product} onQuickView={handleQuickView} />
              </Box>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Pagination */}
      {!loading && filteredProducts.length > 0 && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
          <Pagination
            count={totalPages}
            page={page}
            onChange={handlePageChange}
            color="primary"
            size="large"
            showFirstButton
            showLastButton
          />
        </Box>
      )}

      {/* Quick View Dialog */}
      <Dialog
        open={Boolean(quickViewProduct)}
        onClose={handleCloseQuickView}
        maxWidth="md"
        fullWidth
      >
        {quickViewProduct && (
          <>
            <DialogTitle>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography variant="h6">{quickViewProduct.name}</Typography>
                <IconButton onClick={handleCloseQuickView} size="small">
                  <Close />
                </IconButton>
              </Box>
            </DialogTitle>
            <DialogContent dividers>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <img
                    src={
                      quickViewProduct.images
                        ? quickViewProduct.images[0]
                        : quickViewProduct.image
                    }
                    alt={quickViewProduct.name}
                    style={{ width: "100%", borderRadius: 8 }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="h5" gutterBottom>
                    {quickViewProduct.name}
                  </Typography>

                  {quickViewProduct.category && (
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      gutterBottom
                    >
                      {quickViewProduct.category}
                    </Typography>
                  )}

                  <Typography variant="h6" color="primary" gutterBottom>
                    ₹{quickViewProduct.discountPrice || quickViewProduct.price}
                    {quickViewProduct.discountPrice && (
                      <Typography
                        component="span"
                        sx={{
                          textDecoration: "line-through",
                          color: "text.secondary",
                          ml: 1,
                          fontSize: "0.8em",
                        }}
                      >
                        ₹{quickViewProduct.price}
                      </Typography>
                    )}
                  </Typography>

                  <Typography variant="body1" sx={{ my: 2 }}>
                    {quickViewProduct.description ||
                      "No description available."}
                  </Typography>

                  <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    fullWidth
                  >
                    Add to Cart
                  </Button>
                </Grid>
              </Grid>
            </DialogContent>
          </>
        )}
      </Dialog>

      {/* Compare Products Button (only show if products are selected) */}
      {productsToCompare.length > 0 && (
        <Box
          sx={{
            position: "fixed",
            bottom: 20,
            right: 20,
            zIndex: 10,
            display: "flex",
            alignItems: "center",
            gap: 1,
            bgcolor: "primary.main",
            color: "white",
            p: 2,
            borderRadius: 2,
            boxShadow: 3,
          }}
        >
          <Typography variant="body1">
            {productsToCompare.length} products selected
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleCompareToggle}
            startIcon={<Compare />}
          >
            {compareMode ? "Exit Compare" : "Compare"}
          </Button>
        </Box>
      )}

      {/* Compare Products Dialog */}
      <Dialog
        open={compareMode}
        onClose={() => setCompareMode(false)}
        maxWidth="lg"
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
            <Typography variant="h6">Compare Products</Typography>
            <IconButton onClick={() => setCompareMode(false)} size="small">
              <Close />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent dividers>
          {productsToCompare.length > 0 ? (
            <TableContainer component={Paper} variant="outlined">
              <Table>
                <TableHead>
                  <TableRow sx={{ bgcolor: "background.secondary" }}>
                    <TableCell sx={{ fontWeight: "bold" }}>Feature</TableCell>
                    {productsToCompare.map((product) => (
                      <TableCell key={product.id} sx={{ fontWeight: "bold" }}>
                        {product.name}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {/* Image Row */}
                  <TableRow>
                    <TableCell sx={{ fontWeight: "bold" }}>Image</TableCell>
                    {productsToCompare.map((product) => (
                      <TableCell key={`${product.id}-image`}>
                        <img
                          src={
                            product.images ? product.images[0] : product.image
                          }
                          alt={product.name}
                          style={{
                            width: 120,
                            height: 120,
                            objectFit: "cover",
                          }}
                        />
                      </TableCell>
                    ))}
                  </TableRow>
                  {/* Price Row */}
                  <TableRow>
                    <TableCell sx={{ fontWeight: "bold" }}>Price</TableCell>
                    {productsToCompare.map((product) => (
                      <TableCell key={`${product.id}-price`}>
                        <Typography
                          variant="body1"
                          color="primary"
                          fontWeight="bold"
                        >
                          ₹{product.discountPrice || product.price}
                        </Typography>
                        {product.discountPrice && (
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ textDecoration: "line-through" }}
                          >
                            ₹{product.price}
                          </Typography>
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                  {/* Category Row */}
                  <TableRow>
                    <TableCell sx={{ fontWeight: "bold" }}>Category</TableCell>
                    {productsToCompare.map((product) => (
                      <TableCell key={`${product.id}-category`}>
                        {product.category}
                      </TableCell>
                    ))}
                  </TableRow>
                  {/* Rating Row */}
                  <TableRow>
                    <TableCell sx={{ fontWeight: "bold" }}>Rating</TableCell>
                    {productsToCompare.map((product) => (
                      <TableCell key={`${product.id}-rating`}>
                        {product.rating && (
                          <Box sx={{ display: "flex", alignItems: "center" }}>
                            <Rating
                              value={product.rating}
                              readOnly
                              precision={0.5}
                              size="small"
                            />
                            <Typography variant="body2" sx={{ ml: 1 }}>
                              ({product.reviewCount})
                            </Typography>
                          </Box>
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                  {/* In Stock Row */}
                  <TableRow>
                    <TableCell sx={{ fontWeight: "bold" }}>
                      Availability
                    </TableCell>
                    {productsToCompare.map((product) => (
                      <TableCell key={`${product.id}-stock`}>
                        {product.inStock ? (
                          <Chip label="In Stock" color="success" size="small" />
                        ) : (
                          <Chip
                            label="Out of Stock"
                            color="error"
                            size="small"
                          />
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                  {/* Customizable Row */}
                  <TableRow>
                    <TableCell sx={{ fontWeight: "bold" }}>
                      Customizable
                    </TableCell>
                    {productsToCompare.map((product) => (
                      <TableCell key={`${product.id}-customizable`}>
                        {product.customizable ? (
                          <CheckCircleIcon color="success" fontSize="small" />
                        ) : (
                          <CancelIcon color="error" fontSize="small" />
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                  {/* Description Row */}
                  <TableRow>
                    <TableCell sx={{ fontWeight: "bold" }}>
                      Description
                    </TableCell>
                    {productsToCompare.map((product) => (
                      <TableCell key={`${product.id}-description`}>
                        {product.description}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <Typography variant="body1" textAlign="center" py={3}>
              Please select products to compare
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setCompareMode(false)}>Close</Button>
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              setProductsToCompare([]);
              setCompareMode(false);
            }}
          >
            Clear All
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Shop;
