// src/components/Navbar.jsx
import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/authSlice"; // Assuming you have a logout action in authSlice
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { token } = useSelector((state) => state.auth); // Get token from Redux store

  const handleLogout = () => {
    // Dispatch logout action
    dispatch(logout());

    // Optionally, clear any persisted token from localStorage
    localStorage.removeItem("userToken");

    // Redirect to login page
    navigate("/login");
  };

  return (
    <nav className="bg-blue-500 text-white p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="text-2xl font-bold">
          <Link to="/">MyApp</Link>
        </div>

        <div className="space-x-4">
          <Link to="/" className="hover:text-blue-200">
            Home
          </Link>

          {/* If logged in, show Profile and Logout */}
          {token ? (
            <>
              <Link to="/profile" className="hover:text-blue-200">
                Profile
              </Link>
              <button onClick={handleLogout} className="hover:text-blue-200">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-blue-200">
                Login
              </Link>
              <Link to="/register" className="hover:text-blue-200">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
