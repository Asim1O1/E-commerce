import { Navigate, useLocation } from "react-router-dom";

function CheckAuth({ isAuthenticated, user, children }) {
  const location = useLocation();

  if (!isAuthenticated) {
    if (
      !location.pathname.includes("/login") &&
      !location.pathname.includes("/register")
    ) {
      return <Navigate to="/login" />;
    }
    return <>{children}</>;
  }

  if (
    isAuthenticated &&
    user?.role !== "admin" &&
    location.pathname.includes("/admin")
  ) {
    return <Navigate to="/unauth-page" />;
  }

  if (
    isAuthenticated &&
    user?.role === "admin" &&
    !location.pathname.includes("/admin")
  ) {
    return <Navigate to="/admin" />;
  }

  if (isAuthenticated && user?.role !== "admin" && location.pathname === "/") {
    return <>{children}</>;
  }

  return <>{children}</>;
}

export default CheckAuth;
