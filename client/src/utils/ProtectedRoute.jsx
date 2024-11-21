import { Navigate } from "react-router-dom";

function CheckAuth({ isAuthenticated, user, children }) {
  // If the user is authenticated but trying to access restricted pages.
  if (isAuthenticated) {
    // Redirect based on role if user is authenticated
    if (user?.role === "admin") {
      // If admin, allow access to admin pages
      if (window.location.pathname.includes("/admin")) {
        return <>{children}</>; // Render the admin page
      }
      return <Navigate to="/admin" />; // Redirect to admin page if not already there
    } else {
      // If not admin, redirect to homepage
      if (window.location.pathname !== "/") {
        return <Navigate to="/" />; // Redirect to homepage
      }
      return <>{children}</>; // Render the children (HomePage for non-admins)
    }
  }

  if (
    !isAuthenticated &&
    !(
      window.location.pathname.includes("/login") ||
      window.location.pathname.includes("/register")
    )
  ) {
    return <Navigate to="/login" />; // Redirect to login page
  }

  if (
    isAuthenticated &&
    user?.role !== "admin" &&
    window.location.pathname.includes("/admin")
  ) {
    return <Navigate to="/unauth-page" />;
  }

  // If authenticated, but not on an admin page, just render the children
  if (isAuthenticated && !window.location.pathname.includes("/admin")) {
    return <>{children}</>;
  }

  // Render the children if none of the above conditions are met (for unauthenticated users)
  return <>{children}</>;
}

export default CheckAuth;
