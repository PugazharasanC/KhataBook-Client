// src/components/Home.jsx
import React from "react";
import { Link, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Home = () => {
  const userToken = useSelector((state) => state.auth.token); // Access token from Redux store

  // If a user is logged in (token exists), redirect them to the dashboard
  if (userToken) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center p-4">
      <h1 className="text-4xl font-bold text-center text-blue-600 mb-6">
        Welcome to Our App
      </h1>
      <p className="text-lg text-center mb-6">
        This is a simple home page. You can register, login, and access your
        dashboard.
      </p>

      <div className="flex space-x-4">
        <Link
          to="/login"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Login
        </Link>
        <Link
          to="/register"
          className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
        >
          Register
        </Link>
      </div>
    </div>
  );
};

export default Home;
