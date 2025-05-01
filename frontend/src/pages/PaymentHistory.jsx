import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getUserPayments } from "../services/paymentService";

const PaymentHistory = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await getUserPayments();
        if (response.success) {
          setPayments(response.payments);
        } else {
          throw new Error(response.message || "Failed to fetch payments");
        }
      } catch (error) {
        setError(error.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, []);

  const getStatusBadge = (status) => {
    const badgeClasses = {
      completed: "bg-success",
      pending: "bg-warning",
      failed: "bg-danger",
      refunded: "bg-info",
      default: "bg-secondary",
    };

    const badgeClass = badgeClasses[status] || badgeClasses.default;

    return (
      <span className={`badge ${badgeClass}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-5 text-center">
        <h2>Error</h2>
        <p className="text-danger">{error}</p>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <h2 className="mb-4">Payment History</h2>

      {payments.length === 0 ? (
        <div className="card text-center p-5">
          <div className="card-body">
            <h4>No payment records found</h4>
            <p>You haven't made any payments yet.</p>
            <Link to="/" className="btn btn-primary">
              Start Shopping
            </Link>
          </div>
        </div>
      ) : (
        <div className="card">
          <div className="card-body">
            <div className="table-responsive">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Transaction ID</th>
                    <th>Amount</th>
                    <th>Payment Method</th>
                    <th>Status</th>
                    <th>Order</th>
                  </tr>
                </thead>
                <tbody>
                  {payments.map((payment) => (
                    <tr key={payment._id}>
                      <td>
                        {new Date(payment.createdAt).toLocaleDateString()}
                      </td>
                      <td>{payment.transactionId}</td>
                      <td>₹{payment.amount}</td>
                      <td className="text-capitalize">
                        {payment.paymentMethod}
                      </td>
                      <td>{getStatusBadge(payment.status)}</td>
                      <td>
                        <Link to={`/orders/${payment.order}`}>View Order</Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentHistory;
