// File: authRouter.js (routers/authRouter.js)
// Router for authentication-related endpoints

// Import the Router function from Express to create modular route handlers
import { Router } from "express";

// Import middleware for verifying JWT tokens
import verifyToken from "../middlewares/verifyToken.js";

// Import authentication-related controllers
import { getUser, signUp, signIn } from "../controllers/auth.js";

// Create a new router instance
const authRouter = Router();

// Define the endpoint for user registration
// This route will invoke the signUp controller to handle user registration
authRouter.post("/register", signUp);

// Define the endpoint for user login
// This route will invoke the signIn controller to handle user login and token generation
authRouter.post("/login", signIn);

// Define the endpoint to get the currently authenticated user's information
// This route is protected by the verifyToken middleware to ensure that only authenticated users can access it
authRouter.get("/me", verifyToken, getUser);

// Export the router so it can be used in other parts of the application
export default authRouter;
