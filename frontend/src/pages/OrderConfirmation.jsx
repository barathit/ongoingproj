import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import RazorpayCheckout from "../components/Payment/RazorpayCheckout";

const OrderConfirmation = () => {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        // Replace with your actual API call
        const response = await fetch(`http://localhost:5000/api/orders/${id}`, {
          headers: {
            Authorization: `Bearer ${
              JSON.parse(localStorage.getItem("user"))?.token
            }`,
          },
        });
        const data = await response.json();

        if (data.success) {
          setOrder(data.order);
        } else {
          throw new Error(data.message || "Failed to fetch order");
        }
      } catch (error) {
        setError(error.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id]);

  const handlePaymentSuccess = (result) => {
    console.log("Payment successful:", result);
    // Additional handling if needed
  };

  const handlePaymentError = (error) => {
    console.error("Payment failed:", error);
    // Handle payment error
  };

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <h2>Loading order details...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-5 text-center">
        <h2>Error</h2>
        <p className="text-danger">{error}</p>
        <button className="btn btn-primary" onClick={() => navigate("/orders")}>
          Back to Orders
        </button>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <h2 className="mb-4">Order Confirmation</h2>
      <div className="row">
        <div className="col-md-8">
          <div className="card mb-4">
            <div className="card-header">
              <h4>Order Details</h4>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-6">
                  <p>
                    <strong>Order ID:</strong> {order._id}
                  </p>
                  <p>
                    <strong>Date:</strong>{" "}
                    {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="col-md-6">
                  <p>
                    <strong>Status:</strong> {order.status}
                  </p>
                  <p>
                    <strong>Payment:</strong>{" "}
                    {order.isPaid ? "Paid" : "Not Paid"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="card mb-4">
            <div className="card-header">
              <h4>Shipping Address</h4>
            </div>
            <div className="card-body">
              <p>{order.shippingAddress.street}</p>
              <p>
                {order.shippingAddress.city}, {order.shippingAddress.state}{" "}
                {order.shippingAddress.postalCode}
              </p>
              <p>{order.shippingAddress.country}</p>
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <h4>Order Items</h4>
            </div>
            <ul className="list-group list-group-flush">
              {order.items.map((item) => (
                <li className="list-group-item" key={item._id}>
                  <div className="row">
                    <div className="col-md-2">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="img-fluid rounded"
                      />
                    </div>
                    <div className="col-md-6">
                      <h6>{item.name}</h6>
                    </div>
                    <div className="col-md-4 text-end">
                      {item.quantity} x ₹{item.price} = ₹
                      {item.quantity * item.price}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card">
            <div className="card-header">
              <h4>Order Summary</h4>
            </div>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">
                <div className="row">
                  <div className="col">Items:</div>
                  <div className="col text-end">₹{order.itemsPrice}</div>
                </div>
              </li>
              <li className="list-group-item">
                <div className="row">
                  <div className="col">Shipping:</div>
                  <div className="col text-end">₹{order.shippingPrice}</div>
                </div>
              </li>
              <li className="list-group-item">
                <div className="row">
                  <div className="col">Tax:</div>
                  <div className="col text-end">₹{order.taxPrice}</div>
                </div>
              </li>
              <li className="list-group-item">
                <div className="row">
                  <div className="col">
                    <strong>Total:</strong>
                  </div>
                  <div className="col text-end">
                    <strong>₹{order.totalPrice}</strong>
                  </div>
                </div>
              </li>

              {!order.isPaid && (
                <li className="list-group-item">
                  <RazorpayCheckout
                    orderId={order._id}
                    amount={order.totalPrice}
                    onSuccess={handlePaymentSuccess}
                    onError={handlePaymentError}
                  />
                </li>
              )}

              {order.isPaid && (
                <li className="list-group-item text-center text-success">
                  <p className="mb-0">
                    <strong>Payment Completed</strong>
                  </p>
                  <small>
                    Paid on {new Date(order.paidAt).toLocaleString()}
                  </small>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
