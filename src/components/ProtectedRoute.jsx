// src/components/ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ component }) => {
  const userToken = useSelector((state) => state.auth.token);

  if (!userToken) {
    // If there's no token, redirect to login page
    return <Navigate to="/login" />;
  }

  // If token exists, render the component
  return component;
};

export default ProtectedRoute;
