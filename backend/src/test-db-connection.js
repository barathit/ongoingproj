const mongoose = require("mongoose");
require("dotenv").config();

// Connection URI

const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/weaversnest";
console.log(`Testing MongoDB connection to: ${MONGODB_URI}`);

// Connect to MongoDB
mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("✅ Successfully connected to MongoDB!");

    // Create a simple test record
    const TestModel = mongoose.model(
      "TestConnection",
      new mongoose.Schema({
        message: String,
        timestamp: { type: Date, default: Date.now },
      })
    );

    return TestModel.create({ message: "MongoDB connection test successful!" });
  })
  .then((result) => {
    console.log("✅ Successfully created test record:");
    console.log(result);
    console.log(
      "Database is properly configured and ready to store user registrations."
    );
    process.exit(0);
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
    console.error("\nTroubleshooting tips:");
    console.error(
      "1. Make sure MongoDB is installed and running on your machine"
    );
    console.error(
      "2. Check if MongoDB server is running on the default port 27017"
    );
    console.error("3. Verify that you have permissions to access the database");
    console.error("4. If using authentication, check your credentials");
    process.exit(1);
  });
