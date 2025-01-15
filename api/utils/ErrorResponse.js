// throw new ErrorResponse(401, 'You are not allowed to delete this post');

class ErrorResponse extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

export default ErrorResponse;
