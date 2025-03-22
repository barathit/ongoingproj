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

// Load Stripe outside of components
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

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

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch("/api/payments/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: totalAmount, shipping: shippingAddress }),
    })
      .then((res) => res.json())
      .then((data) => {
        setClientSecret(data.clientSecret);
      });
  }, [totalAmount, shippingAddress]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setProcessing(true);

    if (!stripe || !elements) {
      return;
    }

    const { error: stripeError, paymentIntent } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
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
        },
      });

    if (stripeError) {
      setError(stripeError.message);
      setProcessing(false);
    } else if (paymentIntent.status === "succeeded") {
      // Create order
      try {
        await dispatch(
          createOrder({
            orderItems: cartItems,
            shippingAddress,
            paymentMethod: "stripe",
            paymentResult: {
              id: paymentIntent.id,
              status: paymentIntent.status,
              email_address: shippingAddress.email,
            },
            totalPrice: totalAmount,
          })
        ).unwrap();

        navigate("/order-success");
      } catch (err) {
        setError("Failed to create order. Please try again.");
      }
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
          <span>${totalAmount}</span>
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
