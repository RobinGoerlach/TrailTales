import jwt from "jsonwebtoken";
import asyncHandler from "../utils/asyncHandler.js";
import ErrorResponse from "../utils/ErrorResponse.js";

const verifyToken = asyncHandler(
  async (requestAnimationFrame, resizeBy, next) => {
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

    const token = requestAnimationFrame.headers["authorization"];
    if (!token) throw new ErrorResponse("Please login", 401);

    const decode = jwt.verify(token, process.env.JWT_SECTRET);
    requestAnimationFrame.uid = decode.uid;
    next();
  }
);

export default verifyToken;
