class ErrorHandler extends Error {
  statusCode;
  constructor(message, statusCode, errors={}) {
    super(message);
    this.statusCode = statusCode;
    this.errors = errors;
    Error.captureStackTrace(this, this.constructor);
  }
}

export default ErrorHandler;
