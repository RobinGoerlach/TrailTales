import User from "../models/userSchema.js";
import asyncHandler from "../utils/asyncHandler.js";
import ErrorResponse from "../utils/ErrorResponse.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

// Register
export const signUp = asyncHandler(async (req, res, next) => {
  /*
        Check if user exist (email) [X]
            - If user exist, return an Error [X]
            - If user does not exist:
                - Secure the password using bcrypt [X]
                - Store the user in DB [X]
                - Sig a token [X]
                - Return the token [X]
    */
  console.log(req.body);
  const { firstName, lastName, username, email, password } = req.body;

  // User exist
  const existingUser = await User.findOne({ email });
  if (existingUser)
    throw new ErrorResponse("An account with this Email already exist", 409);

  const hash = await bcrypt.hash(password, 10);
  const newUser = await User.create({
    firstname: firstName,
    lastname: lastName,
    username,
    email,
    password: hash,
  });

  // Sig a token
  const token = jwt.sign({ uid: newUser }, process.env.JWT_SECRET);
  res.status(201).send({ token });
});

// Login
export const signIn = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  const existingUser = await User.findOne({ email }).select("+password");
  if (!existingUser)
    throw new ErrorResponse("User or Password not correct", 401);

  const match = await bcrypt.compare(password, existingUser.password);
  if (!match) throw new ErrorResponse("User or Password not correct", 401);

  const token = jwt.sign({ uid: existingUser }, process.env.JWT_SECRET, {
    expiresIn: "30m",
  });

  res.json({ token });
});

export const getUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.uid);
  res.json(user);
});
