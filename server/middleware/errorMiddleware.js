const errorMiddleware = (err, req, res, next) => {
  // Log the error stack for debugging (only in development)
  console.error(err.stack);

  // Use the status code set in the controller, otherwise default to 500
  const statusCode =
    res.statusCode && res.statusCode !== 200 ? res.statusCode : 500;

  res.status(statusCode).json({
    success: false,
    message: err.message || "Server Error",
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};

module.exports = errorMiddleware;
