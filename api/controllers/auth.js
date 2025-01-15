// File: auth.js (controllers/auth.js)

// Import the User model for interacting with the database
import User from "../models/userSchema.js";

// Import a utility for handling async errors in Express routes
import asyncHandler from "../utils/asyncHandler.js";

// Import a custom error response class for sending structured error messages
import ErrorResponse from "../utils/ErrorResponse.js";

// Import the JSON Web Token library for creating and verifying tokens
import jwt from "jsonwebtoken";

// Import the bcrypt library for hashing and comparing passwords
import bcrypt from "bcrypt";

// Controller for user registration
export const signUp = asyncHandler(async (req, res, next) => {
  // Extract user details from the request body
  const { firstname, lastname, username, email, password } = req.body;

  // Check if a user with the provided email already exists
  const existingUser = await User.findOne({ email });
  if (existingUser)
    throw new ErrorResponse("An account with this email already exists", 409);

  // Hash the password before saving it to the database
  const hash = await bcrypt.hash(password, 10);

  // Create a new user record in the database with the hashed password
  const newUser = await User.create({
    firstname,
    lastname,
    username,
    email,
    password: hash,
  });

  // Generate a JWT token for the new user
  const token = jwt.sign({ uid: newUser._id }, process.env.JWT_SECRET);

  // Send the token in the response with a 201 status code (Created)
  res.status(201).send({ token });
});

// Controller for user login
export const signIn = asyncHandler(async (req, res, next) => {
  // Extract login details from the request body
  const { email, password } = req.body;

  // Find the user in the database by email, including the password field
  const existingUser = await User.findOne({ email }).select("+password");
  if (!existingUser)
    throw new ErrorResponse("User or password not correct", 401);

  // Compare the provided password with the hashed password in the database
  const match = await bcrypt.compare(password, existingUser.password);
  if (!match) throw new ErrorResponse("User or password not correct", 401);

  // Generate a short-lived JWT token for the authenticated user
  const token = jwt.sign({ uid: existingUser._id }, process.env.JWT_SECRET, {
    expiresIn: "30m",
  });

  // Send the token in the response
  res.json({ token });
});

// Controller to fetch user details based on the authenticated user's ID
export const getUser = asyncHandler(async (req, res, next) => {
  // Retrieve the user from the database using the ID stored in the JWT token
  const user = await User.findById(req.uid);

  // Send the user details in the response
  res.json(user);
});
