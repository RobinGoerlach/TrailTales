// File: postRouter.js (routers/postRouter.js)
// Router for post-related endpoints

// Import the Router function from Express to create modular route handlers
import { Router } from "express";

// Import post-related controllers
import {
  getAllPosts, // Controller to fetch all posts
  getPostById, // Controller to fetch a post by ID
  createPost, // Controller to create a new post
  updatePost, // Controller to update a post by ID
  deletePost, // Controller to delete a post by ID
} from "../controllers/post.js";

// Import middleware for verifying JWT tokens
import verifyToken from "../middlewares/verifyToken.js";

// Create a new router instance
const postsRouter = Router();

// Define a public route to fetch all posts
// This route invokes the getAllPosts controller and does not require authentication
postsRouter.route("/").get(getAllPosts);

// Define a protected route to create a new post
// This route invokes the createPost controller and requires a valid token for authentication
postsRouter.route("/").post(verifyToken, createPost);

// Define routes for operations on a specific post by its ID
// These routes include:
// - GET to fetch a post by ID (public)
// - PUT to update a post by ID (protected)
// - DELETE to remove a post by ID (protected)
// The PUT and DELETE routes use the verifyToken middleware to ensure only authorized users can modify or delete posts
postsRouter
  .route("/:id")
  .get(getPostById)
  .put(verifyToken, updatePost)
  .delete(verifyToken, deletePost);

// Export the router for use in other parts of the application
export default postsRouter;
