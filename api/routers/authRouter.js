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
/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: Authentication-related endpoints
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstname:
 *                 type: string
 *                 example: John
 *               lastname:
 *                 type: string
 *                 example: Doe
 *               username:
 *                 type: string
 *                 example: johndoe
 *               email:
 *                 type: string
 *                 example: johndoe@example.com
 *               password:
 *                 type: string
 *                 example: secretpassword
 *     responses:
 *       201:
 *         description: User successfully registered
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *       409:
 *         description: Email already exists
 *       400:
 *         description: Invalid input
 */
authRouter.post("/register", signUp);

// Define the endpoint for user login
// This route will invoke the signIn controller to handle user login and token generation
/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Log in a user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: johndoe@example.com
 *               password:
 *                 type: string
 *                 example: secretpassword
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *       401:
 *         description: Unauthorized - incorrect email or password
 */
authRouter.post("/login", signIn);

/**
 * @swagger
 * /auth/me:
 *   get:
 *     summary: Get the current authenticated user's details
 *     tags: [Authentication]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User details fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   example: 5f8f8c44b54764421b7156c6
 *                 firstname:
 *                   type: string
 *                   example: John
 *                 lastname:
 *                   type: string
 *                   example: Doe
 *                 username:
 *                   type: string
 *                   example: johndoe
 *                 email:
 *                   type: string
 *                   example: johndoe@example.com
 */
// Define the endpoint to get the currently authenticated user's information
// This route is protected by the verifyToken middleware to ensure that only authenticated users can access it
authRouter.get("/me", verifyToken, getUser);

// Export the router so it can be used in other parts of the application
export default authRouter;
