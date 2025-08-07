// Centralized error handler middleware
const winston = require("winston");

// Setup winston logger
const logger = winston.createLogger({
  level: "error",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console(),
    // You can add file transport here
  ],
});

function errorHandler(err, req, res, next) {
  // Default error structure
  let status = 500;
  let message = "Internal Server Error";
  let details = undefined;

  // Validation error
  if (err.name === "ValidationError") {
    status = 400;
    message = err.message || "Validation failed";
    details = err.details;
  } else if (err.name === "BusinessLogicError") {
    status = 422;
    message = err.message || "Business logic error";
    details = err.details;
  } else if (err.status) {
    status = err.status;
    message = err.message;
    details = err.details;
  }

  // Log the error
  logger.error({
    message: err.message,
    stack: err.stack,
    status,
    details,
    url: req.originalUrl,
    method: req.method,
  });

  res.status(status).json({
    success: false,
    error: {
      message,
      details,
    },
  });
}

module.exports = errorHandler;
