const STATUS_CODES = {
  OK: 200,
  BAD_REQUEST: 400,
  UN_AUTHORISED: 403,
  NOT_FOUND: 404,
  INTERNAL_ERROR: 500,
};

class AppError extends Error {
  constructor(
    name,
    statusCode,
    description,
    isOperational,
    errorStack,
    logError
  ) {
    super(description);
    Object.setPrototypeOf(this, new.target.prototype);
    this.name = name;
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    this.errorStack = errorStack;
    this.logError = logError;
    Error.captureStackTrace(this);
  }
  toJSON() {
    return {
      status: "error",
      statusCode: this.statusCode,
      message: this.message,
      errorStack: this.errorStack,  
    };
  }
}

//400
class ValidationError extends AppError {
  constructor(description = "Validation Error", errorStack) {
    super(
      "BAD REQUEST",
      STATUS_CODES.BAD_REQUEST,
      description,
      true,
      errorStack
    );
  }
}

class APIError extends Error {
  constructor(message, errorStack = null) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = 500; // Default status code is internal server error
    this.errorStack = errorStack;
  }
}

class BadRequestError extends APIError {
  constructor(message, errorStack = null) {
    super(message, errorStack);
    this.statusCode = 400; // 400 for Bad Request
  }
}

module.exports = {
  AppError,
  APIError,
  BadRequestError,
  ValidationError,
  STATUS_CODES,
};
