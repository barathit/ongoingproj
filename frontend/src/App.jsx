import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { Toaster } from "react-hot-toast";

// Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Pages
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import About from "./pages/About";
import Contact from "./pages/Contact";
import CustomOrder from "./pages/CustomOrder";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Prebooking from "./pages/Prebooking";
import OrderTracking from "./pages/OrderTracking";
import WeaverUpdates from "./components/WeaverUpdates";
import AdminPanel from "./pages/AdminPanel";
import NotFound from "./pages/NotFound";
import ResetPassword from "./pages/ResetPassword";

// Styles
import "./styles/App.css";

// Define PrivateRoute component with proper hook usage
const PrivateRoute = ({ children, adminRequired = false }) => {
  // Get user from localStorage
  let user = null;
  try {
    const userString = localStorage.getItem("user");
    if (userString) {
      user = JSON.parse(userString);
    }
  } catch (error) {
    console.error("Error parsing user from localStorage:", error);
    localStorage.removeItem("user");
  }

  const isAuthenticated = !!user;
  const isAdmin = user && user.role === "admin"; // Case sensitive - make sure 'admin' is lowercase

  if (!isAuthenticated) {
    console.log("Not authenticated, redirecting to login");
    return <Navigate to="/login" />;
  }

  if (adminRequired && !isAdmin) {
    console.log("Admin required but user is not admin, redirecting to home");
    return <Navigate to="/" />;
  }

  return children;
};

// Layout component for routes with navbar and footer
const MainLayout = ({ children }) => (
  <>
    <Navbar />
    <Box component="main" sx={{ flex: 1 }}>
      {children}
    </Box>
    <Footer />
  </>
);

// Main App component
const App = () => {
  return (
    <BrowserRouter>
      <Box
        sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
      >
        <Routes>
          {/* Admin Routes - No Navbar and Footer for admin pages */}
          <Route
            path="/admin/*"
            element={
              <PrivateRoute adminRequired={true}>
                <AdminPanel />
              </PrivateRoute>
            }
          />

          {/* Auth Routes - No GuestRoute as it causes issues */}
          <Route
            path="/login"
            element={
              <MainLayout>
                <Container sx={{ py: 3 }}>
                  <Login />
                </Container>
              </MainLayout>
            }
          />

          <Route
            path="/register"
            element={
              <MainLayout>
                <Container sx={{ py: 3 }}>
                  <Register />
                </Container>
              </MainLayout>
            }
          />

          <Route
            path="/reset-password/:token"
            element={
              <MainLayout>
                <Container sx={{ py: 3 }}>
                  <ResetPassword />
                </Container>
              </MainLayout>
            }
          />

          {/* Home Route */}
          <Route
            path="/"
            element={
              <MainLayout>
                <Home />
              </MainLayout>
            }
          />

          {/* Other Routes */}
          <Route
            path="/shop"
            element={
              <MainLayout>
                <Container sx={{ py: 3 }}>
                  <Shop />
                </Container>
              </MainLayout>
            }
          />

          <Route
            path="/about"
            element={
              <MainLayout>
                <Container sx={{ py: 3 }}>
                  <About />
                </Container>
              </MainLayout>
            }
          />

          <Route
            path="/contact"
            element={
              <MainLayout>
                <Container sx={{ py: 3 }}>
                  <Contact />
                </Container>
              </MainLayout>
            }
          />

          <Route
            path="/custom-order"
            element={
              <MainLayout>
                <Container sx={{ py: 3 }}>
                  <CustomOrder />
                </Container>
              </MainLayout>
            }
          />

          <Route
            path="/product/:id"
            element={
              <MainLayout>
                <Container sx={{ py: 3 }}>
                  <ProductDetail />
                </Container>
              </MainLayout>
            }
          />

          <Route
            path="/cart"
            element={
              <MainLayout>
                <Container sx={{ py: 3 }}>
                  <Cart />
                </Container>
              </MainLayout>
            }
          />

          {/* Protected Routes */}
          <Route
            path="/profile"
            element={
              <MainLayout>
                <Container sx={{ py: 3 }}>
                  <PrivateRoute>
                    <Profile />
                  </PrivateRoute>
                </Container>
              </MainLayout>
            }
          />

          <Route
            path="/prebooking"
            element={
              <MainLayout>
                <Container sx={{ py: 3 }}>
                  <Prebooking />
                </Container>
              </MainLayout>
            }
          />

          <Route
            path="/order-tracking"
            element={
              <MainLayout>
                <Container sx={{ py: 3 }}>
                  <OrderTracking />
                </Container>
              </MainLayout>
            }
          />

          <Route
            path="/weaver-updates"
            element={
              <MainLayout>
                <Container sx={{ py: 3 }}>
                  <WeaverUpdates />
                </Container>
              </MainLayout>
            }
          />

          {/* 404 Route */}
          <Route
            path="*"
            element={
              <MainLayout>
                <Container sx={{ py: 3 }}>
                  <NotFound />
                </Container>
              </MainLayout>
            }
          />
        </Routes>
        <Toaster position="top-right" />
      </Box>
    </BrowserRouter>
  );
};

export default App;
