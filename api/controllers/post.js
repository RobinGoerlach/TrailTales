// File: post.js (controllers/post.js)

// Import a utility for handling asynchronous errors in Express routes
import asyncHandler from "../utils/asyncHandler.js";

// Import a custom error response class for sending structured error messages
import ErrorResponse from "../utils/ErrorResponse.js";

// Import the Post model for interacting with the posts collection in the database
import Post from "../models/postSchema.js";

// Controller to fetch all posts
export const getAllPosts = asyncHandler(async (req, res, next) => {
  // Fetch all posts from the database and populate the 'author' field with user details
  const posts = await Post.find().populate("author");

  // Throw an error if no posts are found
  if (!posts.length) throw new ErrorResponse("No posts found", 404);

  // Send the list of posts as a JSON response
  res.json(posts);
});

// Controller to fetch a specific post by its ID
export const getPostById = asyncHandler(async (req, res, next) => {
  // Extract the post ID from the request parameters
  const { id } = req.params;

  // Fetch the post by ID and populate the 'author' field
  const post = await Post.findById(id).populate("author");

  // Throw an error if the post is not found
  if (!post) throw new ErrorResponse(`Post with ID ${id} not found`, 404);

  // Send the post details as a JSON response
  res.json(post);
});

// Controller to create a new post
export const createPost = asyncHandler(async (req, res, next) => {
  // Extract the request body and the user ID (uid) from the request
  const { body, uid } = req;

  // Create a new post in the database with the provided data and user as the author
  const newPost = await Post.create({ ...body, author: uid });

  // Fetch the newly created post and populate the 'author' field
  const populatedPost = await Post.findById(newPost._id).populate("author");

  // Send the created post with a 201 status code (Created)
  res.status(201).json(populatedPost);
});

// Controller to update an existing post
export const updatePost = asyncHandler(async (req, res, next) => {
  // Extract the request body, post ID, and user ID from the request
  const {
    body,
    params: { id },
    uid,
  } = req;

  // Find the post by ID
  const found = await Post.findById(id);

  // Throw an error if the post does not exist
  if (!found) throw new ErrorResponse(`Post ${id} does not exist`, 404);

  // Throw an error if the current user is not the author of the post
  if (uid !== found.author.toString())
    throw new ErrorResponse("No permission to update this post", 401);

  // Update the post and return the updated version with the 'author' field populated
  const updatedPost = await Post.findByIdAndUpdate(id, body, {
    new: true,
  }).populate("author");

  // Send the updated post as a JSON response
  res.json(updatedPost);
});

// Controller to delete a post
export const deletePost = asyncHandler(async (req, res, next) => {
  // Extract the post ID and user ID from the request
  const {
    params: { id },
    uid,
  } = req;

  // Find the post by ID
  const found = await Post.findById(id);

  // Throw an error if the post does not exist
  if (!found) throw new ErrorResponse(`Post ${id} does not exist`, 404);

  // Throw an error if the current user is not the author of the post
  if (uid !== found.author.toString())
    throw new ErrorResponse("No permission to delete this post", 401);

  // Delete the post from the database
  await Post.findByIdAndDelete(id);

  // Send a success message as a JSON response
  res.json({ success: `Post with ID ${id} was deleted` });
});
