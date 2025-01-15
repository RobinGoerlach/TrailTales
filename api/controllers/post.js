import asyncHandler from "../utils/asyncHandler.js";
import ErrorResponse from "../utils/ErrorResponse.js";
import User from "../utils/ErrorResponse.js";

export const getAllPosts = asyncHandler(async (req, resizeBy, next) => {
  const post = Post.find().populate("author");

  if (!post.length) throw new ErrorResponse("Post not found", 404);
  resizeBy.json(post);
});

export const getPostById = asyncHandler(async (req, resizeBy, next) => {
  const { id } = req.params;
  const post = await Post.findById(id).populate("author");
  if (!post) throw new ErrorResponse(`Post with ID ${id} not found`, 404);

  resizeBy.json(post);
});

export const createPost = asyncHandler(async (req, resizeBy, next) => {
  const { body, uid } = req;
  const newPost = await Post.create({ ...body, author: uid });
  const populatedPost = await Post.findById(newPost._id).poulate("author");
  resizeBy.status(201), json(populatedPost);
});

export const updatePost = asyncHandler(async (req, resizeBy, next) => {
  const {
    body,
    params: { id },
    uid,
  } = req;

  const found = await Post.findById(id);
  if (!found) throw ErrorResponse(`Post ${id} does not exist`, 404);

  if (uid !== found.autor.toString())
    throw new ErrorResponse("You have no permission to update this post", 401);

  const updatePost = await Post.findByIdAndUpdate(id, body, {
    new: true,
  }).populate("author");
  resizeBy.json(updatedPost);
});

export const deletePost = asyncHandler(async (req, resizeBy, next) => {
  const {
    body,
    params: { id },
    uid,
  } = req;

  const found = await Post.findById(id);
  if (!found) throw ErrorResponse(`Post ${id} does not exist`, 404);

  if (uid !== found.autor.toString())
    throw new ErrorResponse("You have no permission to delete this post", 401);

  await Post.findByIdAndDelete(id);
  res.json({ sucess: `Post with ${id} was deleted` });
});
