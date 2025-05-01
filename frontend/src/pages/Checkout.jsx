import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Paper,
  Typography,
  Grid,
  TextField,
  Button,
  Stepper,
  Step,
  StepLabel,
  Box,
  Divider,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

const steps = ["Shipping address", "Payment details", "Review order"];

const Checkout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [activeStep, setActiveStep] = useState(0);
  const { items: cartItems = [], totalAmount = 0 } = useSelector(
    (state) => state.cart || {}
  );

  const [shippingData, setShippingData] = useState({
    fullName: "",
    email: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    country: "",
  });

  const [paymentData, setPaymentData] = useState({
    orderId: null,
    razorpayOrderId: null,
    error: null,
    processing: false,
  });

  // Check if cart is empty
  useEffect(() => {
    if (cartItems.length === 0) {
      navigate("/cart");
    }
  }, [cartItems, navigate]);

  // Get auth token from localStorage
  const getAuthHeader = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    return user?.token ? { Authorization: `Bearer ${user.token}` } : {};
  };

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);

    if (activeStep === 0) {
      // Save shipping address to localStorage
      localStorage.setItem("shippingAddress", JSON.stringify(shippingData));
    }

    if (activeStep === 1) {
      // Initialize Razorpay payment
      initializeRazorpayPayment();
    }

    if (activeStep === steps.length - 1) {
      // Order completed, process payment
      processPayment();
    }
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleShippingSubmit = (e) => {
    e.preventDefault();
    handleNext();
  };

  const initializeRazorpayPayment = async () => {
    try {
      setPaymentData({ ...paymentData, processing: true, error: null });

      // Create temporary order ID if not exists
      const tempOrderId = "temp_" + Date.now();

      // Create payment intent on your backend
      const response = await fetch(
        "http://localhost:5000/api/payments/razorpay",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...getAuthHeader(),
          },
          body: JSON.stringify({
            amount: totalAmount,
            orderId: tempOrderId,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to create payment intent");
      }

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.message || "Payment initialization failed");
      }

      setPaymentData({
        ...paymentData,
        orderId: tempOrderId,
        razorpayOrderId: data.order.id,
        processing: false,
      });
    } catch (err) {
      setPaymentData({
        ...paymentData,
        error: err.message || "An error occurred while initializing payment.",
        processing: false,
      });
    }
  };

  const processPayment = () => {
    const options = {
      key: "rzp_test_YOUR_KEY_HERE", // Replace with your Razorpay key
      amount: totalAmount * 100, // Amount in paisa
      currency: "INR",
      name: "WeaveNest",
      description: "Purchase from WeaveNest",
      order_id: paymentData.razorpayOrderId,
      handler: function (response) {
        verifyPayment(response);
      },
      prefill: {
        name: shippingData.fullName,
        email: shippingData.email,
        contact: "", // Add phone field to shipping form if needed
      },
      notes: {
        address: shippingData.address,
      },
      theme: {
        color: "#3f51b5",
      },
    };

    const razorpayInstance = new window.Razorpay(options);
    razorpayInstance.open();
  };

  const verifyPayment = async (response) => {
    try {
      // Verify payment with backend
      const verifyResponse = await fetch(
        "http://localhost:5000/api/payments/razorpay/verify",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...getAuthHeader(),
          },
          body: JSON.stringify({
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
            paymentMethod: "razorpay",
          }),
        }
      );

      const result = await verifyResponse.json();

      if (result.success) {
        // Navigate to success page
        navigate("/payment-success", {
          state: {
            paymentId: result.payment._id,
            orderId: result.order._id,
          },
        });
      } else {
        throw new Error(result.message || "Payment verification failed");
      }
    } catch (error) {
      alert(
        "Payment verification failed: " + (error.message || "Unknown error")
      );
    }
  };

  // Load Razorpay script
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <form onSubmit={handleShippingSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Full Name"
                  value={shippingData.fullName}
                  onChange={(e) =>
                    setShippingData({
                      ...shippingData,
                      fullName: e.target.value,
                    })
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Email"
                  type="email"
                  value={shippingData.email}
                  onChange={(e) =>
                    setShippingData({ ...shippingData, email: e.target.value })
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Address"
                  value={shippingData.address}
                  onChange={(e) =>
                    setShippingData({
                      ...shippingData,
                      address: e.target.value,
                    })
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  label="City"
                  value={shippingData.city}
                  onChange={(e) =>
                    setShippingData({ ...shippingData, city: e.target.value })
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  label="State/Province"
                  value={shippingData.state}
                  onChange={(e) =>
                    setShippingData({ ...shippingData, state: e.target.value })
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  label="ZIP / Postal Code"
                  value={shippingData.zip}
                  onChange={(e) =>
                    setShippingData({ ...shippingData, zip: e.target.value })
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  label="Country"
                  value={shippingData.country}
                  onChange={(e) =>
                    setShippingData({
                      ...shippingData,
                      country: e.target.value,
                    })
                  }
                />
              </Grid>
            </Grid>
            <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
              <Button type="submit" variant="contained">
                Next
              </Button>
            </Box>
          </form>
        );
      case 1:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              Payment Method
            </Typography>
            <Typography paragraph>
              We use Razorpay for secure payments. Click "Next" to proceed to
              payment.
            </Typography>
            {paymentData.error && (
              <Typography color="error" sx={{ mt: 2 }}>
                {paymentData.error}
              </Typography>
            )}
            <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
              <Button
                onClick={handleNext}
                variant="contained"
                disabled={paymentData.processing}
              >
                {paymentData.processing ? "Processing..." : "Next"}
              </Button>
            </Box>
          </Box>
        );
      case 2:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              Order Summary
            </Typography>
            <List disablePadding>
              {cartItems.map((item) => (
                <ListItem key={item._id} sx={{ py: 1, px: 0 }}>
                  <ListItemText
                    primary={item.name}
                    secondary={`Quantity: ${item.quantity}`}
                  />
                  <Typography variant="body2">
                    ₹{(item.price * item.quantity).toFixed(2)}
                  </Typography>
                </ListItem>
              ))}
              <ListItem sx={{ py: 1, px: 0 }}>
                <ListItemText primary="Total" />
                <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                  ₹{totalAmount.toFixed(2)}
                </Typography>
              </ListItem>
            </List>

            <Grid container spacing={2} sx={{ mt: 2 }}>
              <Grid item xs={12} sm={6}>
                <Typography variant="h6" gutterBottom>
                  Shipping
                </Typography>
                <Typography gutterBottom>{shippingData.fullName}</Typography>
                <Typography gutterBottom>{shippingData.address}</Typography>
                <Typography gutterBottom>
                  {shippingData.city}, {shippingData.state} {shippingData.zip}
                </Typography>
                <Typography gutterBottom>{shippingData.country}</Typography>
              </Grid>
              <Grid item container direction="column" xs={12} sm={6}>
                <Typography variant="h6" gutterBottom>
                  Payment details
                </Typography>
                <Typography gutterBottom>Razorpay</Typography>
              </Grid>
            </Grid>

            <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
              <Button onClick={handleNext} variant="contained">
                Pay Now
              </Button>
            </Box>
          </Box>
        );
      default:
        return "Unknown step";
    }
  };

  return (
    <Container maxWidth="md" sx={{ mb: 4 }}>
      <Paper sx={{ p: 4, mt: 4 }}>
        <Typography component="h1" variant="h4" align="center" gutterBottom>
          Checkout
        </Typography>
        <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <Divider sx={{ mb: 4 }} />
        {getStepContent(activeStep)}
        {activeStep !== 0 && (
          <Box sx={{ display: "flex", justifyContent: "flex-start", mt: 3 }}>
            <Button onClick={handleBack}>Back</Button>
          </Box>
        )}
      </Paper>
    </Container>
  );
};

export default Checkout;
