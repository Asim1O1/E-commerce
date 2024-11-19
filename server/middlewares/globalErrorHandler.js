import { HttpError } from "http-errors";
import _config from "../utils/config.js";

const createErrorResponse = (
  statusCode,
  errorMessage,
  errorStack,
  errorCode = "UNKNOWN_ERROR"
) => ({
  StatusCode: statusCode,
  IsSuccess: false,
  ErrorMessage: [
    {
      message: errorMessage,
      errorStack: errorStack,
      errorCode,
    },
  ],
  Result: null,
});

const globalErrorHandler = (err, req, res, next) => {
  console.log(err);
  const statusCode = err ? err.status || 500 : 500;
  const errorMessage =
    err && err.message ? err.message : "Internal Server Error";
  const errorStack = _config.env === "development" && err ? err.stack : "";

  res
    .status(statusCode)
    .json(createErrorResponse(statusCode, errorMessage, errorStack));
};

export const notFoundHandler = (req, res, next) => {
  res.status(404).json(createErrorResponse(404, "Not Found"));
};

export default globalErrorHandler;
