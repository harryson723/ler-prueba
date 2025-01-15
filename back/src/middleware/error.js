const { AppError, APIError } = require("../utils/app-errors");

const middlewareError = (err, req, res, next) => {

   if (err instanceof APIError || err instanceof BadRequestError) {
    return res.status(err.statusCode || 500).json({
      error: {
        name: err.name,
        message: err.message,
        stack: err.errorStack || null,
      },
    });
  }

  return res.status(500).json({
    error: {
      name: "InternalServerError",
      message: "An unexpected error occurred.",
    },
  });
};
module.exports = middlewareError;
