import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  createRazorpayOrder,
  verifyRazorpayPayment,
} from "../../services/paymentService";

const RazorpayCheckout = ({ orderId, amount, onSuccess, onError }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handlePayment = async () => {
    try {
      setLoading(true);
      setError(null);

      // Create Razorpay order
      const orderData = await createRazorpayOrder(orderId, amount);

      if (!orderData.success) {
        throw new Error(orderData.message || "Failed to create payment");
      }

      // Load Razorpay script
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;
      document.body.appendChild(script);

      script.onload = () => {
        const options = {
          key: orderData.key,
          amount: orderData.order.amount,
          currency: "INR",
          name: "WeaveNest",
          description: `Payment for Order #${orderId}`,
          order_id: orderData.order.id,
          handler: async function (response) {
            try {
              // Verify payment
              const verifyData = {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                paymentMethod: "credit_card",
              };

              const result = await verifyRazorpayPayment(verifyData);

              if (result.success) {
                if (onSuccess) onSuccess(result);
                navigate("/payment-success", {
                  state: {
                    paymentId: result.payment._id,
                    orderId: result.order._id,
                  },
                });
              } else {
                throw new Error(
                  result.message || "Payment verification failed"
                );
              }
            } catch (error) {
              setError(error.message || "Payment verification failed");
              if (onError) onError(error);
            } finally {
              setLoading(false);
            }
          },
          prefill: {
            name: JSON.parse(localStorage.getItem("user"))?.user?.name || "",
            email: JSON.parse(localStorage.getItem("user"))?.user?.email || "",
          },
          theme: {
            color: "#8e44ad",
          },
        };

        const razorpayInstance = new window.Razorpay(options);
        razorpayInstance.open();
      };

      script.onerror = () => {
        setError("Failed to load payment gateway");
        setLoading(false);
        if (onError) onError(new Error("Failed to load payment gateway"));
      };
    } catch (error) {
      setError(error.message || "Payment initialization failed");
      setLoading(false);
      if (onError) onError(error);
    }
  };

  return (
    <div className="razorpay-checkout">
      {error && <div className="alert alert-danger">{error}</div>}
      <button
        className="btn btn-primary btn-lg w-100 mb-3"
        onClick={handlePayment}
        disabled={loading}
      >
        {loading ? (
          <>
            <span
              className="spinner-border spinner-border-sm me-2"
              role="status"
              aria-hidden="true"
            ></span>
            Processing...
          </>
        ) : (
          "Pay Now"
        )}
      </button>
    </div>
  );
};

export default RazorpayCheckout;
