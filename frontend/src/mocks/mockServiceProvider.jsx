import React, { createContext, useContext, useState, useEffect } from "react";
import API from "./api.jsx";

// Create context for mock services
const MockServiceContext = createContext(null);

// Custom hook for consuming the context
export const useMockServices = () => {
  const context = useContext(MockServiceContext);
  if (context === null) {
    throw new Error(
      "useMockServices must be used within a MockServiceProvider"
    );
  }
  return context;
};

export const MockServiceProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState([]);
  const [error, setError] = useState(null);

  // Load initial data
  useEffect(() => {
    const loadInitialData = async () => {
      try {
        setLoading(true);
        const productsResponse = await API.getProducts();

        if (productsResponse.success) {
          setProducts(productsResponse.data);
        }

        // Check for stored auth data
        const storedAuth = localStorage.getItem("mockAuth");
        if (storedAuth) {
          const parsedAuth = JSON.parse(storedAuth);
          setUser(parsedAuth.user);
          setIsAuthenticated(true);
        }

        // Get cart from local storage
        const storedCart = localStorage.getItem("mockCart");
        if (storedCart) {
          setCart(JSON.parse(storedCart));
        }

        setError(null);
      } catch (err) {
        console.error("Error loading initial data:", err);
        setError("Failed to load initial data");
      } finally {
        setLoading(false);
      }
    };

    loadInitialData();
  }, []);

  // Save cart to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem("mockCart", JSON.stringify(cart));
  }, [cart]);

  // Authentication methods
  const login = async (credentials) => {
    try {
      setLoading(true);
      const response = await API.login(credentials);

      if (response.success) {
        setUser(response.data.user);
        setIsAuthenticated(true);
        localStorage.setItem("mockAuth", JSON.stringify(response.data));
        return { success: true };
      } else {
        return { success: false, error: response.error };
      }
    } catch (err) {
      console.error("Login error:", err);
      return { success: false, error: "An unexpected error occurred" };
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    try {
      setLoading(true);
      const response = await API.register(userData);

      if (response.success) {
        setUser(response.data.user);
        setIsAuthenticated(true);
        localStorage.setItem("mockAuth", JSON.stringify(response.data));
        return { success: true };
      } else {
        return { success: false, error: response.error };
      }
    } catch (err) {
      console.error("Registration error:", err);
      return { success: false, error: "An unexpected error occurred" };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("mockAuth");
  };

  // Cart methods
  const addToCart = (product, quantity = 1) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);

      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity }];
      }
    });
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  const updateCartItemQuantity = (productId, quantity) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  // Other mock services
  const getProduct = async (id) => {
    try {
      setLoading(true);
      const response = await API.getProductById(id);
      setLoading(false);
      return response;
    } catch (err) {
      console.error("Error getting product:", err);
      setLoading(false);
      return { success: false, error: "Failed to get product" };
    }
  };

  const getTestimonials = async () => {
    try {
      const response = await API.getTestimonials();
      return response;
    } catch (err) {
      console.error("Error getting testimonials:", err);
      return { success: false, error: "Failed to get testimonials" };
    }
  };

  const value = {
    // Auth
    isAuthenticated,
    user,
    login,
    register,
    logout,

    // Products
    products,
    getProduct,

    // Cart
    cart,
    addToCart,
    removeFromCart,
    updateCartItemQuantity,
    clearCart,

    // Other
    loading,
    error,
    getTestimonials,
    setIsAuthenticated,
  };

  return (
    <MockServiceContext.Provider value={value}>
      {children}
    </MockServiceContext.Provider>
  );
};

export default MockServiceProvider;
