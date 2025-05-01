import axios from "axios";

const API_URL = "http://localhost:5000/api/payments";

// Get auth token from localStorage
const getToken = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return user?.token;
};

// Create headers with auth token
const authHeader = () => {
  const token = getToken();
  return {
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
  };
};

// Create Razorpay order
export const createRazorpayOrder = async (orderId, amount) => {
  try {
    const response = await axios.post(
      `${API_URL}/razorpay`,
      { orderId, amount },
      authHeader()
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Error creating payment" };
  }
};

// Verify Razorpay payment
export const verifyRazorpayPayment = async (paymentData) => {
  try {
    const response = await axios.post(
      `${API_URL}/razorpay/verify`,
      paymentData,
      authHeader()
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Error verifying payment" };
  }
};

// Get user payment history
export const getUserPayments = async () => {
  try {
    const response = await axios.get(API_URL, authHeader());
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Error fetching payments" };
  }
};

// Get payment details by ID
export const getPaymentById = async (paymentId) => {
  try {
    const response = await axios.get(`${API_URL}/${paymentId}`, authHeader());
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Error fetching payment details" };
  }
};
