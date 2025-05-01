import React, { useState, useEffect } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Badge,
  Container,
  useTheme,
  useMediaQuery,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Avatar,
  Divider,
} from "@mui/material";
import {
  ShoppingCart,
  Person,
  Menu as MenuIcon,
  Close,
  Search,
  Collections,
  Palette,
  Home,
  Phone,
  Login,
  KeyboardArrowDown,
  KeyboardArrowUp,
  AccountCircle,
  ExitToApp,
  PersonAdd,
} from "@mui/icons-material";

const Navbar = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [userMenuAnchor, setUserMenuAnchor] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);

  // Initialize state from localStorage
  useEffect(() => {
    // Check authentication status
    try {
      const userString = localStorage.getItem("user");
      if (userString) {
        const parsedUser = JSON.parse(userString);
        setUser(parsedUser);
        setIsAuthenticated(true);
      } else {
        setUser(null);
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error("Error parsing user data:", error);
      localStorage.removeItem("user");
      setIsAuthenticated(false);
      setUser(null);
    }

    // Get cart items if available
    try {
      const cartString = localStorage.getItem("cart");
      if (cartString) {
        const parsedCart = JSON.parse(cartString);
        setCart(parsedCart);
      }
    } catch (error) {
      console.error("Error parsing cart data:", error);
      localStorage.removeItem("cart");
      setCart([]);
    }
  }, []);

  // Calculate cart item count from the cart
  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      setScrolled(isScrolled);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const customOrderRoutes = [
    { name: "Prebooking", path: "/prebooking" },
    { name: "Order Tracking", path: "/order-tracking" },
    { name: "Weaver Updates", path: "/weaver-updates" },
  ];

  const handleCustomOrderClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const navItems = [
    { name: "Home", path: "/", icon: <Home /> },
    { name: "Collections", path: "/shop", icon: <Collections /> },
    {
      name: "Custom Orders",
      path: "/custom-order",
      icon: <Palette />,
      hasDropdown: true,
    },
    { name: "Contact Us", path: "/contact", icon: <Phone /> },
  ];

  const handleDrawerToggle = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleNavigation = (path) => {
    console.log("Mobile navigation to:", path);
    navigate(path);
    setMobileMenuOpen(false);
  };

  const handleUserMenuClick = (event) => {
    setUserMenuAnchor(event.currentTarget);
  };

  const handleUserMenuClose = () => {
    setUserMenuAnchor(null);
  };

  const handleLogout = () => {
    // Clear user data
    localStorage.removeItem("user");
    setUser(null);
    setIsAuthenticated(false);

    handleUserMenuClose();
    navigate("/login");
  };

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: scrolled ? "#FFFFFF" : "transparent",
          boxShadow: scrolled ? "0 2px 10px rgba(0,0,0,0.1)" : "none",
          transition: "all 0.3s ease",
        }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            {/* Logo */}
            <Typography
              variant="h6"
              component={RouterLink}
              to="/"
              sx={{
                mr: 2,
                fontWeight: 700,
                color: scrolled ? "#000000" : "#000000",
                textDecoration: "none",
                flexGrow: { xs: 1, md: 0 },
              }}
            >
              WEAVENEST
            </Typography>

            {/* Mobile Menu Icon */}
            {isMobile && (
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{
                  color: scrolled ? "#000000" : "#000000",
                }}
              >
                <MenuIcon />
              </IconButton>
            )}

            {/* Desktop Navigation */}
            {!isMobile && (
              <Box sx={{ flexGrow: 1, display: "flex", ml: 4 }}>
                {navItems.map((item) =>
                  item.hasDropdown ? (
                    <Box key={item.name}>
                      <Button
                        onClick={handleCustomOrderClick}
                        sx={{
                          color: scrolled ? "#000000" : "#000000",
                          mx: 1,
                          "&:hover": {
                            color: "#D5A419",
                          },
                        }}
                        endIcon={
                          anchorEl ? <KeyboardArrowUp /> : <KeyboardArrowDown />
                        }
                      >
                        {item.name}
                      </Button>
                      <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleMenuClose}
                        sx={{
                          "& .MuiPaper-root": {
                            borderRadius: 2,
                            minWidth: 180,
                            boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
                          },
                        }}
                      >
                        {customOrderRoutes.map((route) => (
                          <MenuItem
                            key={route.path}
                            onClick={() => {
                              handleMenuClose();
                              navigate(route.path);
                            }}
                            sx={{
                              py: 1,
                              "&:hover": {
                                backgroundColor: "rgba(213, 164, 25, 0.1)",
                                color: "#D5A419",
                              },
                            }}
                          >
                            {route.name}
                          </MenuItem>
                        ))}
                      </Menu>
                    </Box>
                  ) : (
                    <Button
                      key={item.name}
                      onClick={() => {
                        console.log("Navigating to:", item.path);
                        navigate(item.path);
                      }}
                      sx={{
                        color: scrolled ? "#000000" : "#000000",
                        mx: 1,
                        "&:hover": {
                          color: "#D5A419",
                        },
                      }}
                    >
                      {item.name}
                    </Button>
                  )
                )}
              </Box>
            )}

            {/* Right Side Icons */}
            <Box sx={{ display: "flex", alignItems: "center" }}>
              {/* Search Icon */}
              <IconButton
                onClick={() => navigate("/search")}
                sx={{
                  color: scrolled ? "#000000" : "#000000",
                  "&:hover": { color: "#D5A419" },
                }}
              >
                <Search />
              </IconButton>

              {/* Cart Icon */}
              <IconButton
                onClick={() => navigate("/cart")}
                sx={{
                  color: scrolled ? "#000000" : "#000000",
                  "&:hover": { color: "#D5A419" },
                }}
              >
                <Badge badgeContent={cartItemCount} color="primary">
                  <ShoppingCart />
                </Badge>
              </IconButton>

              {/* User Menu */}
              <Box sx={{ position: "relative", ml: 2 }}>
                <IconButton
                  onClick={handleUserMenuClick}
                  sx={{
                    color: scrolled ? "#000000" : "#000000",
                    "&:hover": { color: "#D5A419" },
                  }}
                >
                  {isAuthenticated ? (
                    <Avatar
                      sx={{
                        width: 32,
                        height: 32,
                        bgcolor: "#FFFFFF",
                        color: "#000000",
                        border: "1px solid #E0E0E0",
                      }}
                    >
                      {user?.name ? (
                        user.name.charAt(0).toUpperCase()
                      ) : (
                        <Person />
                      )}
                    </Avatar>
                  ) : (
                    <Person />
                  )}
                </IconButton>
                <Menu
                  anchorEl={userMenuAnchor}
                  open={userMenuAnchor !== null}
                  onClose={handleUserMenuClose}
                  sx={{
                    "& .MuiPaper-root": {
                      borderRadius: 2,
                      minWidth: 200,
                      boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                    },
                  }}
                >
                  {isAuthenticated ? (
                    <>
                      <MenuItem
                        onClick={() => {
                          handleUserMenuClose();
                          navigate("/profile");
                        }}
                        sx={{
                          py: 1.5,
                          color: "#2C1810",
                          "&:hover": {
                            color: "#D5A419",
                            bgcolor: "rgba(213, 164, 25, 0.1)",
                          },
                        }}
                      >
                        <ListItemIcon sx={{ minWidth: 40, color: "inherit" }}>
                          <AccountCircle />
                        </ListItemIcon>
                        <ListItemText primary="My Profile" />
                      </MenuItem>
                      <Divider />
                      <MenuItem
                        onClick={handleLogout}
                        sx={{
                          py: 1.5,
                          color: "#2C1810",
                          "&:hover": {
                            color: "#D5A419",
                            bgcolor: "rgba(213, 164, 25, 0.1)",
                          },
                        }}
                      >
                        <ListItemIcon sx={{ minWidth: 40, color: "inherit" }}>
                          <ExitToApp />
                        </ListItemIcon>
                        <ListItemText primary="Logout" />
                      </MenuItem>
                    </>
                  ) : (
                    <>
                      <MenuItem
                        onClick={() => {
                          handleUserMenuClose();
                          navigate("/login");
                        }}
                        sx={{
                          py: 1.5,
                          color: "#2C1810",
                          "&:hover": {
                            color: "#D5A419",
                            bgcolor: "rgba(213, 164, 25, 0.1)",
                          },
                        }}
                      >
                        <ListItemIcon sx={{ minWidth: 40, color: "inherit" }}>
                          <Login />
                        </ListItemIcon>
                        <ListItemText primary="Login" />
                      </MenuItem>
                      <MenuItem
                        onClick={() => {
                          handleUserMenuClose();
                          navigate("/register");
                        }}
                        sx={{
                          py: 1.5,
                          color: "#2C1810",
                          "&:hover": {
                            color: "#D5A419",
                            bgcolor: "rgba(213, 164, 25, 0.1)",
                          },
                        }}
                      >
                        <ListItemIcon sx={{ minWidth: 40, color: "inherit" }}>
                          <PersonAdd />
                        </ListItemIcon>
                        <ListItemText primary="Register" />
                      </MenuItem>
                    </>
                  )}
                </Menu>
              </Box>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={mobileMenuOpen}
        onClose={handleDrawerToggle}
        sx={{
          "& .MuiDrawer-paper": {
            width: 280,
            backgroundColor: "#FFFFFF",
          },
        }}
      >
        <Box sx={{ p: 2, display: "flex", justifyContent: "flex-end" }}>
          <IconButton onClick={handleDrawerToggle}>
            <Close />
          </IconButton>
        </Box>
        <List>
          {navItems.map((item) =>
            item.hasDropdown ? (
              <div key={item.name}>
                <ListItem
                  button
                  onClick={handleCustomOrderClick}
                  sx={{
                    py: 2,
                    "&:hover": {
                      backgroundColor: "rgba(213, 164, 25, 0.1)",
                      color: "#D5A419",
                    },
                  }}
                >
                  <ListItemIcon sx={{ color: "inherit" }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText primary={item.name} />
                  {anchorEl ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                </ListItem>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                >
                  {customOrderRoutes.map((route) => (
                    <MenuItem
                      key={route.path}
                      onClick={() => {
                        handleNavigation(route.path);
                        handleMenuClose();
                      }}
                    >
                      {route.name}
                    </MenuItem>
                  ))}
                </Menu>
              </div>
            ) : (
              <ListItem
                button
                key={item.name}
                onClick={() => handleNavigation(item.path)}
                sx={{
                  py: 2,
                  "&:hover": {
                    backgroundColor: "rgba(213, 164, 25, 0.1)",
                    color: "#D5A419",
                  },
                }}
              >
                <ListItemIcon sx={{ color: "inherit" }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.name} />
              </ListItem>
            )
          )}

          {/* Add Login/Register buttons to mobile menu */}
          <Divider sx={{ my: 2 }} />
          {isAuthenticated ? (
            <>
              <ListItem
                button
                onClick={() => handleNavigation("/profile")}
                sx={{
                  py: 2,
                  "&:hover": {
                    backgroundColor: "rgba(213, 164, 25, 0.1)",
                    color: "#D5A419",
                  },
                }}
              >
                <ListItemIcon sx={{ color: "inherit" }}>
                  <AccountCircle />
                </ListItemIcon>
                <ListItemText primary="My Profile" />
              </ListItem>
              <ListItem
                button
                onClick={() => {
                  handleLogout();
                  handleDrawerToggle();
                }}
                sx={{
                  py: 2,
                  "&:hover": {
                    backgroundColor: "rgba(213, 164, 25, 0.1)",
                    color: "#D5A419",
                  },
                }}
              >
                <ListItemIcon sx={{ color: "inherit" }}>
                  <ExitToApp />
                </ListItemIcon>
                <ListItemText primary="Logout" />
              </ListItem>
            </>
          ) : (
            <>
              <ListItem
                button
                onClick={() => {
                  handleDrawerToggle();
                  navigate("/login");
                }}
                sx={{
                  py: 2,
                  "&:hover": {
                    backgroundColor: "rgba(213, 164, 25, 0.1)",
                    color: "#D5A419",
                  },
                }}
              >
                <ListItemIcon sx={{ color: "inherit" }}>
                  <Login />
                </ListItemIcon>
                <ListItemText primary="Login" />
              </ListItem>
              <ListItem
                button
                onClick={() => {
                  handleDrawerToggle();
                  navigate("/register");
                }}
                sx={{
                  py: 2,
                  "&:hover": {
                    backgroundColor: "rgba(213, 164, 25, 0.1)",
                    color: "#D5A419",
                  },
                }}
              >
                <ListItemIcon sx={{ color: "inherit" }}>
                  <PersonAdd />
                </ListItemIcon>
                <ListItemText primary="Register" />
              </ListItem>
            </>
          )}
        </List>
      </Drawer>
    </>
  );
};

export default Navbar;
