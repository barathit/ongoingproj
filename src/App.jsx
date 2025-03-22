import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Routes, Route, Navigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { Toaster } from "react-hot-toast";
import { MockServiceProvider } from "./mocks/mockServiceProvider";

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
  const user = JSON.parse(localStorage.getItem("user"));
  const isAdmin = user && user.role === "Admin";
  const isAuthenticated = !!user;

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (adminRequired && !isAdmin) {
    return <Navigate to="/" />;
  }

  return children;
};

// Define GuestRoute component
const GuestRoute = ({ children }) => {
  const user = localStorage.getItem("user");
  return !user ? children : <Navigate to="/" />;
};

// Main App component
const App = () => {
  return (
    <MockServiceProvider>
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

            {/* Public Routes - With Navbar and Footer */}
            <Route
              path="*"
              element={
                <>
                  <Navbar />
                  <Box component="main" sx={{ flex: 1 }}>
                    <Routes>
                      {/* Home page */}
                      <Route path="/" element={<Home />} />

                      {/* Shop pages */}
                      <Route
                        path="/shop"
                        element={
                          <Container sx={{ py: 3 }}>
                            <Shop />
                          </Container>
                        }
                      />

                      {/* Auth pages */}
                      <Route
                        path="/login"
                        element={
                          <Container sx={{ py: 3 }}>
                            <GuestRoute>
                              <Login />
                            </GuestRoute>
                          </Container>
                        }
                      />
                      <Route
                        path="/register"
                        element={
                          <Container sx={{ py: 3 }}>
                            <GuestRoute>
                              <Register />
                            </GuestRoute>
                          </Container>
                        }
                      />
                      <Route
                        path="/reset-password/:token"
                        element={
                          <Container sx={{ py: 3 }}>
                            <GuestRoute>
                              <ResetPassword />
                            </GuestRoute>
                          </Container>
                        }
                      />

                      {/* Protected Routes */}
                      <Route
                        path="/profile"
                        element={
                          <Container sx={{ py: 3 }}>
                            <PrivateRoute>
                              <Profile />
                            </PrivateRoute>
                          </Container>
                        }
                      />

                      {/* Other Routes */}
                      <Route
                        path="/about"
                        element={
                          <Container sx={{ py: 3 }}>
                            <About />
                          </Container>
                        }
                      />
                      <Route
                        path="/contact"
                        element={
                          <Container sx={{ py: 3 }}>
                            <Contact />
                          </Container>
                        }
                      />
                      <Route
                        path="/custom-order"
                        element={
                          <Container sx={{ py: 3 }}>
                            <CustomOrder />
                          </Container>
                        }
                      />
                      <Route
                        path="/product/:id"
                        element={
                          <Container sx={{ py: 3 }}>
                            <ProductDetail />
                          </Container>
                        }
                      />
                      <Route
                        path="/cart"
                        element={
                          <Container sx={{ py: 3 }}>
                            <Cart />
                          </Container>
                        }
                      />
                      <Route
                        path="/prebooking"
                        element={
                          <Container sx={{ py: 3 }}>
                            <Prebooking />
                          </Container>
                        }
                      />
                      <Route
                        path="/order-tracking"
                        element={
                          <Container sx={{ py: 3 }}>
                            <OrderTracking />
                          </Container>
                        }
                      />
                      <Route
                        path="/weaver-updates"
                        element={
                          <Container sx={{ py: 3 }}>
                            <WeaverUpdates />
                          </Container>
                        }
                      />

                      {/* 404 Route */}
                      <Route
                        path="*"
                        element={
                          <Container sx={{ py: 3 }}>
                            <NotFound />
                          </Container>
                        }
                      />
                    </Routes>
                  </Box>
                  <Footer />
                </>
              }
            />
          </Routes>
          <Toaster position="top-right" />
        </Box>
      </BrowserRouter>
    </MockServiceProvider>
  );
};

export default App;
