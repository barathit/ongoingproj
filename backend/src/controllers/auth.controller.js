const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const mongoose = require("mongoose");

// Mock users for development when MongoDB is not available
const mockUsers = [
  {
    _id: "mock-admin-id",
    name: "Admin User",
    email: "admin@example.com",
    password: "$2a$10$OfKwpkxZOFQm5fhBJuIrpuAr8eMeS9yYBAF.ECp1UlTICCkZ5L2n.", // hashed "password123"
    role: "admin",
  },
  {
    _id: "mock-user-id",
    name: "John Doe",
    email: "john@example.com",
    password: "$2a$10$OfKwpkxZOFQm5fhBJuIrpuAr8eMeS9yYBAF.ECp1UlTICCkZ5L2n.", // hashed "password123"
    role: "user",
  },
];

// In-memory storage for registered users when MongoDB is not available
const inMemoryUsers = [...mockUsers];

const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET || "your-secret-key", {
    expiresIn: "1d",
  });
};

// Check if MongoDB is connected
const isMongoConnected = () => {
  return mongoose.connection.readyState === 1;
};

exports.register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    // Check if MongoDB is connected
    if (mongoose.connection.readyState !== 1) {
      console.log(
        "MongoDB not connected, using in-memory storage for registration"
      );

      // Check if user already exists in mock data
      if (inMemoryUsers.find((user) => user.email === email)) {
        return res.status(400).json({
          success: false,
          message: "User already exists",
        });
      }

      // Create new in-memory user
      const newUser = {
        _id: `mock-${Date.now()}`,
        name,
        email,
        password:
          "$2a$10$OfKwpkxZOFQm5fhBJuIrpuAr8eMeS9yYBAF.ECp1UlTICCkZ5L2n.", // Mock hashed password
        role: "user",
      };

      inMemoryUsers.push(newUser);

      // Generate token
      const token = generateToken(newUser._id);

      return res.status(201).json({
        success: true,
        token,
        user: {
          id: newUser._id,
          name: newUser.name,
          email: newUser.email,
          role: newUser.role,
        },
      });
    }

    // MongoDB is connected - normal flow
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    // Create new user
    const user = await User.create({
      name,
      email,
      password,
    });

    // Generate token
    const token = generateToken(user._id);

    res.status(201).json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Check if MongoDB is connected
    if (mongoose.connection.readyState !== 1) {
      console.log("MongoDB not connected, using mock auth for login");

      // For development, allow login with mock users
      if (email === "admin@example.com" || email === "john@example.com") {
        const mockUser = inMemoryUsers.find((u) => u.email === email);

        if (!mockUser) {
          return res.status(401).json({
            success: false,
            message: "Invalid credentials",
          });
        }

        // Generate token
        const token = generateToken(mockUser._id);

        return res.json({
          success: true,
          token,
          user: {
            id: mockUser._id,
            name: mockUser.name,
            email: mockUser.email,
            role: mockUser.role,
          },
        });
      } else {
        // Try to find user in in-memory storage
        const user = inMemoryUsers.find((u) => u.email === email);
        if (!user) {
          return res.status(401).json({
            success: false,
            message: "Invalid credentials",
          });
        }

        // Generate token
        const token = generateToken(user._id);

        return res.json({
          success: true,
          token,
          user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
          },
        });
      }
    }

    // MongoDB is connected - normal flow
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // Generate token
    const token = generateToken(user._id);

    res.json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    next(error);
  }
};
