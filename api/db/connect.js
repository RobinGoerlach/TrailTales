// File: connect.js (db/connect.js)

// Import the Mongoose library for interacting with a MongoDB database
import mongoose from "mongoose";

// Define an asynchronous function to establish a database connection
const connectDB = async () => {
  try {
    // Attempt to connect to MongoDB using the connection string stored in the environment variable
    await mongoose.connect(process.env.MONGO_URI);

    // Log a success message if the connection is established
    console.log("Connected to MongoDB");
  } catch (error) {
    // Log an error message if the connection fails, including the error stack for debugging
    console.error("Connection error:", error.stack);

    // Exit the process with a failure code (1) to indicate the error
    process.exit(1);
  }
};

// Immediately invoke the connectDB function to establish the connection
connectDB();
