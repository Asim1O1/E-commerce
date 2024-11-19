import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import PropTypes from "prop-types"; // Import PropTypes for prop validation

const ProtectedRoute = ({ children, rolesAllowed }) => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  // If the user is not authenticated, redirect to the login page
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  // If the user does not have the necessary role, redirect to the homepage or another page
  if (rolesAllowed && !rolesAllowed.includes(user?.role)) {
    return <Navigate to="/" />;
  }

  // If the user is authenticated and has the correct role, render the children (protected content)
  return children;
};

// Prop validation for `rolesAllowed` prop
ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired, // `children` can be any renderable content
  rolesAllowed: PropTypes.arrayOf(PropTypes.string), // `rolesAllowed` should be an array of strings (roles)
};

export default ProtectedRoute;
