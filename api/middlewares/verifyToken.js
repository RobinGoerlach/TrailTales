// File: verifyToken.js (middlewares/verifyToken.js)

// Import the JSON Web Token library for verifying tokens
import jwt from "jsonwebtoken";

// Import a utility for handling asynchronous errors in Express routes
import asyncHandler from "../utils/asyncHandler.js";

// Import a custom error response class for sending structured error messages
import ErrorResponse from "../utils/ErrorResponse.js";

// Define middleware to verify the JWT token
const verifyToken = asyncHandler(async (req, res, next) => {
  // Extract the token from the 'Authorization' header
  const token = req.headers["authorization"];

  // If no token is provided, throw an error with a 401 (Unauthorized) status
  if (!token) throw new ErrorResponse("Please login", 401);

  try {
    // Verify the token using the secret stored in environment variables
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach the decoded user ID (uid) to the request object for use in subsequent middleware or routes
    req.uid = decoded.uid;

    // Pass control to the next middleware or route handler
    next();
  } catch (err) {
    // If token verification fails, throw an error with a 401 (Unauthorized) status
    throw new ErrorResponse("Invalid token", 401);
  }
});

// Export the middleware for use in other parts of the application
export default verifyToken;
