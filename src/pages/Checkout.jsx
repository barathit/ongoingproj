import { useState } from "react";
import { useSelector } from "react-redux";
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
} from "@mui/material";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

// Replace with your Stripe publishable key
const stripePromise = loadStripe("your_publishable_key");

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      fontSize: "16px",
      color: "#424770",
      "::placeholder": {
        color: "#aab7c4",
      },
    },
    invalid: {
      color: "#9e2146",
    },
  },
};

const steps = ["Shipping address", "Payment details", "Review order"];

const CheckoutForm = ({ handleNext, shippingData }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);
  const { totalAmount } = useSelector((state) => state.cart);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setProcessing(true);

    if (!stripe || !elements) {
      return;
    }

    try {
      // Create payment intent on your backend
      const response = await fetch("/api/create-payment-intent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: totalAmount * 100, // Convert to cents
          shipping: shippingData,
        }),
      });

      const { clientSecret } = await response.json();

      const { error: stripeError, paymentIntent } =
        await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card: elements.getElement(CardElement),
            billing_details: {
              name: shippingData.fullName,
              email: shippingData.email,
              address: {
                line1: shippingData.address,
                city: shippingData.city,
                state: shippingData.state,
                postal_code: shippingData.zip,
                country: shippingData.country,
              },
            },
          },
        });

      if (stripeError) {
        setError(stripeError.message);
        setProcessing(false);
      } else if (paymentIntent.status === "succeeded") {
        handleNext();
      }
    } catch (err) {
      setError("An error occurred while processing your payment.");
      setProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement options={CARD_ELEMENT_OPTIONS} />
      {error && (
        <Typography color="error" sx={{ mt: 2 }}>
          {error}
        </Typography>
      )}
      <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
        <Button
          type="submit"
          variant="contained"
          disabled={!stripe || processing}
        >
          {processing ? "Processing..." : `Pay $${totalAmount.toFixed(2)}`}
        </Button>
      </Box>
    </form>
  );
};

const Checkout = () => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [shippingData, setShippingData] = useState({
    fullName: "",
    email: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    country: "",
  });

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
    if (activeStep === steps.length - 1) {
      // Order completed, navigate to confirmation page
      navigate("/order-confirmation");
    }
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleShippingSubmit = (e) => {
    e.preventDefault();
    handleNext();
  };

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
          <Elements stripe={stripePromise}>
            <CheckoutForm handleNext={handleNext} shippingData={shippingData} />
          </Elements>
        );
      case 2:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              Order Summary
            </Typography>
            {/* Add order summary details here */}
            <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
              <Button onClick={handleNext} variant="contained">
                Place Order
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
