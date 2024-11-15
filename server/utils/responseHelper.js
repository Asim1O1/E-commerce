export const createResponse = (
  statusCode = 500,
  isSuccess = false,
  errorMessage = [],
  result = null
) => {
  return {
    StatusCode: statusCode,
    IsSuccess: isSuccess,
    ErrorMessage: errorMessage,
    Result: result,
  };
};
