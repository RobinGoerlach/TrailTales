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

/**
 * @swagger
 * tags:
 *   name: Posts
 *   description: Post management endpoints
 */

/**
 * @swagger
 * /posts:
 *   get:
 *     summary: Retrieve all posts
 *     tags: [Posts]
 *     responses:
 *       200:
 *         description: List of posts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Post'
 *       404:
 *         description: No posts found
 *   post:
 *     summary: Create a new post
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: My First Post
 *               content:
 *                 type: string
 *                 example: This is the content of my first post.
 *               image:
 *                 type: string
 *                 example: https://example.com/image.jpg
 *     responses:
 *       201:
 *         description: Post created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 *       401:
 *         description: Unauthorized
 */
// Define a public route to fetch all posts
// This route invokes the getAllPosts controller and does not require authentication
postsRouter.route("/").get(getAllPosts).post(verifyToken, createPost);

// Define a protected route to create a new post
// This route invokes the createPost controller and requires a valid token for authentication
postsRouter.route("/").post(verifyToken, createPost);

/**
 * @swagger
 * /posts/{id}:
 *   get:
 *     summary: Retrieve a post by its ID
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the post
 *     responses:
 *       200:
 *         description: Post details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 *       404:
 *         description: Post not found
 *   put:
 *     summary: Update a post by its ID
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the post
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: Updated Title
 *               content:
 *                 type: string
 *                 example: Updated content of the post.
 *               image:
 *                 type: string
 *                 example: https://example.com/updated-image.jpg
 *     responses:
 *       200:
 *         description: Post updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Post not found
 *   delete:
 *     summary: Delete a post by its ID
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the post
 *     responses:
 *       200:
 *         description: Post deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Post not found
 */
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
