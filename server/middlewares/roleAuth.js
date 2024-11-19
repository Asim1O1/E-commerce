import { createResponse } from "../utils/responseHelper.js";

export const authorizeRole = (requiredRole) => {
  return (req, res, next) => {
    try {
      const userRole = req.user?.role;

      if (!userRole) {
        return res
          .status(401)
          .json(
            createResponse(401, false, [
              { message: "Authentication required. Please log in." },
            ])
          );
      }

      if (userRole !== requiredRole) {
        return res.status(403).json(
          createResponse(403, false, [
            {
              message: `Access denied. You need the ${requiredRole} role to perform this action.`,
            },
          ])
        );
      }

      next();
    } catch (error) {
      console.error("Authorization error:", error);
      return res.status(500).json(
        createResponse(500, false, [
          {
            message:
              "An error occurred while checking permissions. Please try again later.",
          },
        ])
      );
    }
  };
};
