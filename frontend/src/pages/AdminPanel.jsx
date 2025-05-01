import React, { useState, useEffect } from "react";
import {
  Routes,
  Route,
  useNavigate,
  Navigate,
  useLocation,
} from "react-router-dom";
import {
  Box,
  Drawer,
  AppBar,
  Toolbar,
  List,
  Typography,
  Divider,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText,
  useTheme,
  useMediaQuery,
  Avatar,
  Button,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Dashboard,
  Category,
  ShoppingCart,
  People,
  BookOnline,
  Payment,
  ChevronLeft,
  Home,
} from "@mui/icons-material";

// Import admin components
import DashboardComponent from "../components/admin/Dashboard";
import SareeManagement from "../components/admin/SareeManagement";
import OrderManagement from "../components/admin/OrderManagement";
import UserManagement from "../components/admin/UserManagement";
import PrebookingManagement from "../components/admin/PrebookingManagement";
import PaymentManagement from "../components/admin/PaymentManagement";

// Mock admin check (replace with your actual auth logic)
const isAdmin = () => {
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    return user && user.role === "admin";
  } catch (error) {
    console.error("Error checking admin status:", error);
    return false;
  }
};

const drawerWidth = 280;

const menuItems = [
  { text: "Dashboard", icon: <Dashboard />, path: "" },
  { text: "Saree Management", icon: <Category />, path: "sarees" },
  { text: "Order Management", icon: <ShoppingCart />, path: "orders" },
  { text: "User Management", icon: <People />, path: "users" },
  { text: "Prebooking Management", icon: <BookOnline />, path: "prebookings" },
  { text: "Payment Management", icon: <Payment />, path: "payments" },
];

const AdminPanel = () => {
  const [open, setOpen] = useState(true);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Check admin status on component mount and route changes
    if (!isAdmin()) {
      navigate("/login", { replace: true });
      return;
    }

    setOpen(!isMobile);

    // Redirect to dashboard if at /admin
    if (location.pathname === "/admin") {
      navigate("", { replace: true });
    }
  }, [isMobile, location.pathname, navigate]);

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  const handleMenuClick = (path) => {
    navigate(path);
  };

  const handleHomeClick = () => {
    navigate("/");
  };

  // Function to check if a menu item is active
  const isMenuItemActive = (path) => {
    const currentPath = location.pathname.replace("/admin/", "");
    return (
      path === currentPath ||
      (path === "" && (currentPath === "admin" || currentPath === ""))
    );
  };

  // If not admin, don't render anything (redirect will happen in useEffect)
  if (!isAdmin()) {
    return null;
  }

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar
        position="fixed"
        sx={{
          width: { md: `calc(100% - ${open ? drawerWidth : 0}px)` },
          ml: { md: `${open ? drawerWidth : 0}px` },
          bgcolor: "white",
          color: "text.primary",
          boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="toggle drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2 }}
          >
            {open ? <ChevronLeft /> : <MenuIcon />}
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            Admin Panel
          </Typography>
          <Button
            startIcon={<Home />}
            onClick={handleHomeClick}
            sx={{ mr: 2, color: "inherit" }}
          >
            Home
          </Button>
          <Avatar sx={{ bgcolor: "#D5A419" }}>A</Avatar>
        </Toolbar>
      </AppBar>

      <Drawer
        variant={isMobile ? "temporary" : "persistent"}
        anchor="left"
        open={open}
        onClose={handleDrawerToggle}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            bgcolor: "#1C1C1C",
            color: "white",
          },
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            px: [1],
            bgcolor: "#D5A419",
          }}
        >
          <Typography variant="h6" noWrap component="div" sx={{ py: 2 }}>
            WeaverNest Admin
          </Typography>
        </Toolbar>
        <Divider sx={{ bgcolor: "rgba(255,255,255,0.12)" }} />
        <List component="nav" sx={{ px: 2 }}>
          {menuItems.map((item) => (
            <ListItem
              button
              key={item.text}
              onClick={() => handleMenuClick(item.path)}
              sx={{
                borderRadius: 2,
                mb: 1,
                bgcolor: isMenuItemActive(item.path)
                  ? "rgba(213, 164, 25, 0.1)"
                  : "transparent",
                color: isMenuItemActive(item.path) ? "#D5A419" : "white",
                "&:hover": {
                  bgcolor: "rgba(213, 164, 25, 0.1)",
                  color: "#D5A419",
                },
              }}
            >
              <ListItemIcon sx={{ color: "inherit", minWidth: 40 }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      </Drawer>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { md: `calc(100% - ${drawerWidth}px)` },
          bgcolor: "#F5F5F5",
          minHeight: "100vh",
        }}
      >
        <Toolbar />
        <Routes>
          <Route index element={<DashboardComponent />} />
          <Route path="sarees" element={<SareeManagement />} />
          <Route path="orders" element={<OrderManagement />} />
          <Route path="users" element={<UserManagement />} />
          <Route path="prebookings" element={<PrebookingManagement />} />
          <Route path="payments" element={<PaymentManagement />} />
          <Route path="*" element={<Navigate to="" replace />} />
        </Routes>
      </Box>
    </Box>
  );
};

export default AdminPanel;
