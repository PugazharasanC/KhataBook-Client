import React, { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser, setUser } from "../slices/userSlice";


function GoogleLogin() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user); // Get the user from Redux store

  useEffect(() => {
    // Check if the user is logged in by calling /auth/check
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/auth/check`, {
        withCredentials: true,
      })
      .then((response) => {
        if (response.data.authenticated) {
          dispatch(
            setUser({ user: response.data.user })
          );
        }
      })
      .catch((err) => {
        console.error("Error checking authentication:", err);
      });
  }, [dispatch]); // The dependency is set to dispatch to avoid unnecessary re-renders

  const handleLogin = () => {
    // Redirect to the Google login route
    window.location.href = `${import.meta.env.VITE_BACKEND_URL}/auth/google`;
  };

  const handleLogout = () => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/auth/logout`, {
        withCredentials: true,
      })
      .then(() => {
        dispatch(logoutUser()); // Dispatch the logout action to clear user data in Redux store
      })
      .catch((err) => {
        console.error("Error logging out:", err);
      });
  };

  return (
    <div>
      {!user ? (
        <button onClick={handleLogin}>Login with Google</button>
      ) : (
        <div>
          <h1>Welcome, {user.name}</h1>
          <img src={user.profilePicture} alt="Profile" />
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
    </div>
  );
}

export default GoogleLogin;
