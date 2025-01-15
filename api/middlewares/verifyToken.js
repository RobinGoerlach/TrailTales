import jwt from "jsonwebtoken";
import asyncHandler from "../utils/asyncHandler.js";
import ErrorResponse from "../utils/ErrorResponse.js";

const verifyToken = asyncHandler(async (req, res, next) => {
  /*
    Check if token is present in request []
    - if not, return an error
    -if present,
        - verify token using jwt.verify []
        - if invalid, return an error []
        - if valid,
        - create uid
        - next();
     */
  const token = req.headers["authorization"];
  if (!token) throw new ErrorResponse("Please login", 401);

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.uid = decoded.uid;
    next();
  } catch (err) {
    throw new ErrorResponse("Invalid token", 401);
  }
});

export default verifyToken;
