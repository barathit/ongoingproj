import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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

const mockUsers = [
  {
    email: "admin@weavenest.com",
    password: "admin123",
    role: "Admin",
  },
  {
    email: "customer@example.com",
    password: "customer123",
    role: "Customer",
  },
];

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
      const user = mockUsers.find(
        (u) => u.email === formData.email && u.password === formData.password
      );

      if (!user) {
        throw new Error("Invalid email or password");
      }

      // Store user data in localStorage
      localStorage.setItem("user", JSON.stringify(user));

      // Show success message
      toast.success("Login successful!");

      // Redirect based on role
      if (user.role === "Admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (err) {
      setError(err.message);
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
          <Link href="/forgot-password" variant="body2">
            Forgot password?
          </Link>
        </Box>

        <Box sx={{ mt: 2, textAlign: "center" }}>
          <Typography variant="body2">
            Don't have an account?{" "}
            <Link href="/register" variant="body2">
              Register here
            </Link>
          </Typography>
        </Box>

        <Box sx={{ mt: 4, p: 2, bgcolor: "grey.100", borderRadius: 1 }}>
          <Typography variant="subtitle2" align="center" gutterBottom>
            Demo Credentials
          </Typography>
          <Typography variant="body2" align="center">
            Admin: admin@weavenest.com / admin123
            <br />
            Customer: customer@example.com / customer123
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default Login;
