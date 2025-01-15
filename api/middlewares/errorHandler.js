// File: errorHandler.js (middlewares/errorHandler.js)

// Define an error-handling middleware function for Express
export const errorHandler = (err, req, res, next) => {
  // Log the error stack trace to the console for debugging
  console.error(err.stack);

  // Send a JSON response with the error message and an appropriate status code
  // Use the status code from the error object if available, or default to 500 (Internal Server Error)
  res.status(err.statusCode || 500).json({ error: err.message });
};
