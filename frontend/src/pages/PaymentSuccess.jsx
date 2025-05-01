import { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { getPaymentById } from "../services/paymentService";
import { FaCheckCircle } from "react-icons/fa";

const PaymentSuccess = () => {
  const [payment, setPayment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const fetchPaymentDetails = async () => {
      try {
        const { paymentId } = location.state || {};

        if (!paymentId) {
          throw new Error("Payment information not found");
        }

        const response = await getPaymentById(paymentId);
        if (response.success) {
          setPayment(response.payment);
        } else {
          throw new Error(
            response.message || "Failed to fetch payment details"
          );
        }
      } catch (error) {
        setError(error.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchPaymentDetails();
  }, [location]);

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <h2>Loading payment details...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-5 text-center">
        <h2>Error</h2>
        <p className="text-danger">{error}</p>
        <Link to="/orders" className="btn btn-primary">
          View Orders
        </Link>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow-sm">
            <div className="card-body text-center p-5">
              <FaCheckCircle size={60} className="text-success mb-4" />
              <h2 className="mb-4">Payment Successful!</h2>
              <p className="lead mb-4">
                Thank you for your purchase. Your payment has been processed
                successfully.
              </p>

              <div className="payment-details my-4">
                <div className="row mb-2">
                  <div className="col-6 text-end fw-bold">Amount:</div>
                  <div className="col-6 text-start">₹{payment?.amount}</div>
                </div>
                <div className="row mb-2">
                  <div className="col-6 text-end fw-bold">Payment ID:</div>
                  <div className="col-6 text-start">
                    {payment?.transactionId}
                  </div>
                </div>
                <div className="row mb-2">
                  <div className="col-6 text-end fw-bold">Status:</div>
                  <div className="col-6 text-start text-capitalize">
                    {payment?.status}
                  </div>
                </div>
                <div className="row mb-2">
                  <div className="col-6 text-end fw-bold">Date:</div>
                  <div className="col-6 text-start">
                    {new Date(payment?.createdAt).toLocaleString()}
                  </div>
                </div>
              </div>

              <div className="d-flex justify-content-center gap-3 mt-4">
                <Link to="/orders" className="btn btn-primary">
                  View Orders
                </Link>
                <Link to="/" className="btn btn-outline-primary">
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
