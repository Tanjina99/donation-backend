const createSuccessResponse = (statusCode, message, data) => {
  return {
    status: "Success",
    statusCode,
    message,
    data,
  };
};

const createErrorResponse = (
  statusCode,
  message,
  error = "An error occured"
) => {
  return {
    status: "Error",
    statusCode,
    message,
    error: error.message,
  };
};

module.exports = {
  createSuccessResponse,
  createErrorResponse,
};
