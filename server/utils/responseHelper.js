
export const createResponse = (
  statusCode,
  isSuccess,
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
