import React, { useState } from "react";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Link,
  Paper,
  Alert,
} from "@mui/material";
import { toast } from "react-hot-toast";
import { authService } from "../services/api";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Login with authService which will authenticate with the backend
      const response = await authService.login(
        formData.email,
        formData.password
      );

      toast.success("Login successful!");

      // Redirect based on user role
      if (response.user.role === "admin") {
        // Redirect to admin panel
        console.log("Redirecting to admin panel");
        navigate("/admin");
      } else {
        // Redirect to home page
        console.log("Redirecting to home page");
        navigate("/");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError(
        error.response?.data?.message ||
          "Invalid credentials. Please try again."
      );
      toast.error("Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 8 }}>
        <Typography variant="h4" component="h1" align="center" gutterBottom>
          Login
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            margin="normal"
            required
          />

          <TextField
            fullWidth
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            margin="normal"
            required
          />

          <Button
            fullWidth
            type="submit"
            variant="contained"
            color="primary"
            size="large"
            sx={{ mt: 3 }}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </Button>
        </form>

        <Box sx={{ mt: 2, textAlign: "center" }}>
          <Link component={RouterLink} to="/forgot-password" variant="body2">
            Forgot password?
          </Link>
        </Box>

        <Box sx={{ mt: 2, textAlign: "center" }}>
          <Typography variant="body2">
            Don't have an account?{" "}
            <Link component={RouterLink} to="/register" variant="body2">
              Register here
            </Link>
          </Typography>
        </Box>

        <Box sx={{ mt: 4, p: 2, bgcolor: "grey.100", borderRadius: 1 }}>
          <Typography variant="subtitle2" align="center" gutterBottom>
            Demo Credentials
          </Typography>
          <Typography variant="body2" align="center">
            User: john@example.com / any password
            <br />
            Admin: admin@example.com / any password
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default Login;
