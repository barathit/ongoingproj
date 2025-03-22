// Mock API data and handlers
const mockProducts = [
  {
    id: 1,
    name: "Royal Kanchipuram Silk",
    description: "Traditional bridal silk saree with pure zari work",
    price: 45999,
    discountPrice: 41999,
    image:
      "https://i.pinimg.com/474x/19/3a/f6/193af67bc09f9b98df2f36a728f888bf.jpg",
    images: [
      "https://i.pinimg.com/474x/19/3a/f6/193af67bc09f9b98df2f36a728f888bf.jpg",
      "https://i.pinimg.com/474x/19/3a/f6/193af67bc09f9b98df2f36a728f888bf.jpg",
    ],
    category: "Silk Sarees",
    inStock: true,
    isNew: false,
    isTrending: true,
    featured: true,
    customizable: true,
    rating: 4.9,
    reviewCount: 124,
    salesCount: 89,
    createdAt: "2023-01-15",
  },
  {
    id: 2,
    name: "Mysore Pure Silk",
    description: "Elegant pure silk saree with temple border",
    price: 28999,
    discountPrice: 26999,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdO1xZF69bE8joxIfu1bI9dJcDLqvk6CQ8XA&s",
    images: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdO1xZF69bE8joxIfu1bI9dJcDLqvk6CQ8XA&s",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdO1xZF69bE8joxIfu1bI9dJcDLqvk6CQ8XA&s",
    ],
    category: "Silk Sarees",
    inStock: true,
    isNew: false,
    isTrending: false,
    featured: true,
    customizable: false,
    rating: 4.7,
    reviewCount: 87,
    salesCount: 76,
    createdAt: "2023-02-20",
  },
  {
    id: 3,
    name: "Banarasi Silk",
    description: "Handwoven Banarasi silk with intricate motifs",
    price: 35999,
    discountPrice: null,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYzUE_i7wwkIh7ttdMNAaZPbdFdSV9P6_4NQ&s",
    images: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYzUE_i7wwkIh7ttdMNAaZPbdFdSV9P6_4NQ&s",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYzUE_i7wwkIh7ttdMNAaZPbdFdSV9P6_4NQ&s",
    ],
    category: "Silk Sarees",
    inStock: true,
    isNew: true,
    isTrending: true,
    featured: true,
    customizable: true,
    rating: 4.8,
    reviewCount: 65,
    salesCount: 52,
    createdAt: "2025-03-05",
  },
  {
    id: 4,
    name: "Cotton Handloom",
    description: "Lightweight cotton saree with contemporary design",
    price: 4999,
    discountPrice: 3999,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYzUE_i7wwkIh7ttdMNAaZPbdFdSV9P6_4NQ&s",
    images: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYzUE_i7wwkIh7ttdMNAaZPbdFdSV9P6_4NQ&s",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYzUE_i7wwkIh7ttdMNAaZPbdFdSV9P6_4NQ&s",
    ],
    category: "Cotton Sarees",
    inStock: true,
    isNew: false,
    isTrending: false,
    featured: true,
    customizable: false,
    rating: 4.5,
    reviewCount: 42,
    salesCount: 38,
    createdAt: "2023-04-10",
  },
  {
    id: 5,
    name: "Designer Linen Saree",
    description: "Premium linen saree with minimalist design",
    price: 7999,
    discountPrice: null,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdO1xZF69bE8joxIfu1bI9dJcDLqvk6CQ8XA&s",
    images: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdO1xZF69bE8joxIfu1bI9dJcDLqvk6CQ8XA&s",
    ],
    category: "Linen Sarees",
    inStock: true,
    isNew: true,
    isTrending: false,
    featured: false,
    customizable: false,
    rating: 4.3,
    reviewCount: 28,
    salesCount: 21,
    createdAt: "2025-03-15",
  },
  {
    id: 6,
    name: "Handcrafted Ikat Saree",
    description: "Traditional handcrafted ikat pattern",
    price: 12999,
    discountPrice: 11499,
    image:
      "https://i.pinimg.com/474x/19/3a/f6/193af67bc09f9b98df2f36a728f888bf.jpg",
    images: [
      "https://i.pinimg.com/474x/19/3a/f6/193af67bc09f9b98df2f36a728f888bf.jpg",
    ],
    category: "Handloom Sarees",
    inStock: true,
    isNew: false,
    isTrending: false,
    featured: false,
    customizable: true,
    rating: 4.6,
    reviewCount: 37,
    salesCount: 29,
    createdAt: "2023-06-20",
  },
  {
    id: 7,
    name: "Embroidered Wedding Saree",
    description: "Luxurious saree with rich embroidery, perfect for weddings",
    price: 52999,
    discountPrice: null,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYzUE_i7wwkIh7ttdMNAaZPbdFdSV9P6_4NQ&s",
    images: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYzUE_i7wwkIh7ttdMNAaZPbdFdSV9P6_4NQ&s",
    ],
    category: "Wedding Collection",
    inStock: false,
    isNew: false,
    isTrending: true,
    featured: true,
    customizable: true,
    rating: 5.0,
    reviewCount: 19,
    salesCount: 15,
    createdAt: "2023-07-05",
  },
  {
    id: 8,
    name: "Tussar Silk Saree",
    description: "Natural tussar silk with traditional motifs",
    price: 18999,
    discountPrice: 15999,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdO1xZF69bE8joxIfu1bI9dJcDLqvk6CQ8XA&s",
    images: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdO1xZF69bE8joxIfu1bI9dJcDLqvk6CQ8XA&s",
    ],
    category: "Silk Sarees",
    inStock: true,
    isNew: false,
    isTrending: false,
    featured: false,
    customizable: false,
    rating: 4.4,
    reviewCount: 32,
    salesCount: 27,
    createdAt: "2023-08-12",
  },
  {
    id: 9,
    name: "Designer Kurti Set",
    description: "Modern kurti with palazzo pants",
    price: 5999,
    discountPrice: 4999,
    image:
      "https://i.pinimg.com/474x/19/3a/f6/193af67bc09f9b98df2f36a728f888bf.jpg",
    images: [
      "https://i.pinimg.com/474x/19/3a/f6/193af67bc09f9b98df2f36a728f888bf.jpg",
    ],
    category: "Kurtis",
    inStock: true,
    isNew: true,
    isTrending: true,
    featured: false,
    customizable: false,
    rating: 4.2,
    reviewCount: 45,
    salesCount: 38,
    createdAt: "2025-03-01",
  },
  {
    id: 10,
    name: "Handcrafted Necklace",
    description: "Traditional design with modern elements",
    price: 3999,
    discountPrice: null,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYzUE_i7wwkIh7ttdMNAaZPbdFdSV9P6_4NQ&s",
    images: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYzUE_i7wwkIh7ttdMNAaZPbdFdSV9P6_4NQ&s",
    ],
    category: "Accessories",
    inStock: true,
    isNew: true,
    isTrending: false,
    featured: false,
    customizable: true,
    rating: 4.7,
    reviewCount: 23,
    salesCount: 18,
    createdAt: "2025-02-15",
  },
  {
    id: 11,
    name: "Party Wear Kurti",
    description: "Stylish party wear kurti with embellishments",
    price: 7499,
    discountPrice: 6499,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdO1xZF69bE8joxIfu1bI9dJcDLqvk6CQ8XA&s",
    images: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdO1xZF69bE8joxIfu1bI9dJcDLqvk6CQ8XA&s",
    ],
    category: "Kurtis",
    inStock: true,
    isNew: false,
    isTrending: true,
    featured: false,
    customizable: false,
    rating: 4.3,
    reviewCount: 51,
    salesCount: 43,
    createdAt: "2023-11-25",
  },
  {
    id: 12,
    name: "Traditional Bangles Set",
    description: "Handcrafted bangles with traditional designs",
    price: 1999,
    discountPrice: 1499,
    image:
      "https://i.pinimg.com/474x/19/3a/f6/193af67bc09f9b98df2f36a728f888bf.jpg",
    images: [
      "https://i.pinimg.com/474x/19/3a/f6/193af67bc09f9b98df2f36a728f888bf.jpg",
    ],
    category: "Accessories",
    inStock: true,
    isNew: false,
    isTrending: false,
    featured: false,
    customizable: false,
    rating: 4.5,
    reviewCount: 38,
    salesCount: 32,
    createdAt: "2023-12-05",
  },
];

const mockUsers = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    role: "user",
  },
  {
    id: 2,
    name: "Admin User",
    email: "admin@example.com",
    role: "admin",
  },
];

// Mock API functions
export const getProducts = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        data: mockProducts,
        count: mockProducts.length,
      });
    }, 500);
  });
};

export const getProductById = (id) => {
  return new Promise((resolve) => {
    const product = mockProducts.find((p) => p.id === parseInt(id));
    setTimeout(() => {
      resolve({
        success: true,
        data: product || null,
      });
    }, 300);
  });
};

export const login = (credentials) => {
  return new Promise((resolve) => {
    const { email } = credentials;
    const user = mockUsers.find((u) => u.email === email);

    setTimeout(() => {
      if (user) {
        resolve({
          success: true,
          data: {
            user: { ...user, password: undefined },
            token: "mock-jwt-token-" + Date.now(),
          },
        });
      } else {
        resolve({
          success: false,
          error: "Invalid credentials",
        });
      }
    }, 800);
  });
};

export const register = (userData) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newUser = {
        id: mockUsers.length + 1,
        ...userData,
        role: "user",
      };

      resolve({
        success: true,
        data: {
          user: { ...newUser, password: undefined },
          token: "mock-jwt-token-" + Date.now(),
        },
      });
    }, 1000);
  });
};

export const getTestimonials = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        data: [
          {
            id: 1,
            name: "Priya Sharma",
            location: "Mumbai",
            content:
              "The silk saree I purchased for my daughter's wedding was exquisite. The craftsmanship is unparalleled, and the customer service was exceptional.",
            rating: 5,
            image: "https://randomuser.me/api/portraits/women/44.jpg",
          },
          {
            id: 2,
            name: "Arun Patel",
            location: "Delhi",
            content:
              "Bought a Banarasi saree for my wife's birthday. She was extremely happy with the quality and design. Will definitely purchase again!",
            rating: 5,
            image: "https://randomuser.me/api/portraits/men/32.jpg",
          },
          {
            id: 3,
            name: "Lakshmi Iyer",
            location: "Chennai",
            content:
              "As someone who appreciates traditional craftsmanship, I'm impressed by the attention to detail in every saree from this store.",
            rating: 4,
            image: "https://randomuser.me/api/portraits/women/68.jpg",
          },
        ],
      });
    }, 600);
  });
};

// Export an API object with all the functions
const API = {
  getProducts,
  getProductById,
  login,
  register,
  getTestimonials,
};

export default API;
