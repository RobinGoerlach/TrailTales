// File: index.js

//
import { setupSwagger } from "./swaggerConfig.js";

// Import the Express framework for building web applications
import express from "express";

// Import the CORS middleware to enable Cross-Origin Resource Sharing
import cors from "cors";

// Import the custom error-handling middleware
import { errorHandler } from "./middlewares/errorHandler.js";

// Import the authentication routes
import authRouter from "./routers/authRouter.js";

// Import the post-related routes
import postsRouter from "./routers/postRouter.js";

// Import the database connection setup
import "./db/connect.js"; // This immediately runs the connect.js file to establish a database connection

// Create an instance of the Express application
const app = express();

// Define the port for the server, using the environment variable if available, or default to 3000
const PORT = process.env.PORT || 3000;

// Apply the CORS middleware to allow requests from different origins
app.use(cors());

// Use the Express JSON parser to handle JSON payloads in incoming requests
app.use(express.json());

// Setup Swagger UI
setupSwagger(app);

// Mount the authentication router at the "/auth" path
// All routes in authRouter will be prefixed with "/auth"
app.use("/auth", authRouter);

// Mount the posts router at the "/posts" path
// All routes in postsRouter will be prefixed with "/posts"
app.use("/posts", postsRouter);

// Define a catch-all route for the root path
// This will send a message when a user accesses the base URL ("/")
/*app.use("/", (req, res) => {
  res.status(404).send("404 - Server is Offline");
});*/

// Apply the custom error-handling middleware as the last middleware
// This ensures any errors are caught and formatted appropriately
app.use(errorHandler);

// Start the server and listen on the specified port
// Log a message to the console to indicate the server is running
app.listen(PORT, () => console.log(`The server is running on port: ${PORT}`));
