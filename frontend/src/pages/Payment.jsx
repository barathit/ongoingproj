import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import {
  CardElement,
  Elements,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { createOrder } from "../features/orders/ordersSlice";

// Load Stripe outside of components - use import.meta.env for Vite
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const CheckoutForm = () => {
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [clientSecret, setClientSecret] = useState("");

  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { items: cartItems, totalAmount } = useSelector((state) => state.cart);
  const { shippingAddress } = useSelector((state) => state.checkout);

  // Get auth token from localStorage
  const getAuthHeader = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    return user?.token ? { Authorization: `Bearer ${user.token}` } : {};
  };

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch("http://localhost:5000/api/payments/razorpay", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...getAuthHeader(),
      },
      body: JSON.stringify({
        amount: totalAmount,
        orderId: localStorage.getItem("currentOrderId"), // Make sure to store orderId when creating order
      }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to create payment intent");
        }
        return res.json();
      })
      .then((data) => {
        if (data.success) {
          setClientSecret(data.order.id);
        } else {
          setError(data.message || "Payment initialization failed");
        }
      })
      .catch((err) => {
        setError(err.message || "Payment initialization failed");
      });
  }, [totalAmount]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setProcessing(true);

    if (!stripe || !elements) {
      return;
    }

    try {
      const cardElement = elements.getElement(CardElement);

      const { error: stripeError, paymentMethod } =
        await stripe.createPaymentMethod({
          type: "card",
          card: cardElement,
          billing_details: {
            name: shippingAddress.fullName,
            email: shippingAddress.email,
            address: {
              line1: shippingAddress.address,
              city: shippingAddress.city,
              state: shippingAddress.state,
              postal_code: shippingAddress.zipCode,
              country: shippingAddress.country,
            },
          },
        });

      if (stripeError) {
        setError(stripeError.message);
        setProcessing(false);
        return;
      }

      // Verify payment with backend
      const response = await fetch(
        "http://localhost:5000/api/payments/razorpay/verify",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...getAuthHeader(),
          },
          body: JSON.stringify({
            razorpay_order_id: clientSecret,
            razorpay_payment_id: paymentMethod.id,
            razorpay_signature: "generated_by_backend", // This will be verified on backend
            paymentMethod: "card",
          }),
        }
      );

      const result = await response.json();

      if (result.success) {
        // Create order if not already created
        if (!localStorage.getItem("currentOrderId")) {
          await dispatch(
            createOrder({
              orderItems: cartItems,
              shippingAddress,
              paymentMethod: "razorpay",
              paymentResult: {
                id: paymentMethod.id,
                status: "completed",
                email_address: shippingAddress.email,
              },
              totalPrice: totalAmount,
            })
          ).unwrap();
        }

        // Clear current order ID from localStorage
        localStorage.removeItem("currentOrderId");

        navigate("/payment-success", {
          state: {
            paymentId: result.payment._id,
            orderId: result.order._id,
          },
        });
      } else {
        throw new Error(result.message || "Payment verification failed");
      }
    } catch (err) {
      setError(err.message || "Payment failed. Please try again.");
    }

    setProcessing(false);
  };

  return (
    <form onSubmit={handleSubmit} className="payment-form">
      <h2>Payment Details</h2>

      <div className="order-summary">
        <h3>Order Summary</h3>
        <div className="summary-row">
          <span>Total Amount:</span>
          <span>₹{totalAmount}</span>
        </div>
      </div>

      <div className="card-element-container">
        <CardElement
          options={{
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
          }}
        />
      </div>

      {error && <div className="error-message">{error}</div>}

      <button
        type="submit"
        disabled={!stripe || processing}
        className="payment-button"
      >
        {processing ? "Processing..." : "Pay Now"}
      </button>
    </form>
  );
};

const Payment = () => {
  return (
    <div className="payment-container">
      <Elements stripe={stripePromise}>
        <CheckoutForm />
      </Elements>
    </div>
  );
};

export default Payment;
