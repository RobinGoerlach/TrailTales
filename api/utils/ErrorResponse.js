// File: ErrorResponse.js (utils/ErrorResponse.js)
// Custom error class to standardize error responses

// Define a function that takes another function (fn) as an argument
function asyncHandler(fn) {
  // Return a new function that wraps the provided function (fn)
  return function (req, res, next) {
    // Ensure the function (fn) is executed as a promise
    // If an error occurs, it is automatically passed to the next middleware (e.g., error handler)
    return Promise.resolve(fn(req, res, next)).catch(next);
  };
}

// Export the asyncHandler function for use in other parts of the application
export default asyncHandler;
