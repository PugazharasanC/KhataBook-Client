import React, { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom v6
import { setUser } from "../slices/userSlice";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.user); // Get user and token from Redux state

  useEffect(() => {
    // Check if user is authenticated (has a token)
    if (!user) {
      navigate("/"); // Redirect to login if not authenticated
      return;
    }

    // Fetch user data from the backend if the user is authenticated
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/dashboard`, {
        withCredentials: true,
      })
      .then((response) => {
        dispatch(setUser({ user: response.data })); // Store user data in Redux state
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
        navigate("/"); // Redirect to login if there's an error (e.g., session expired)
      });
  }, [user, dispatch, navigate]); // Dependency array includes token, dispatch, and navigate

  if (!user) {
    return <div>Loading...</div>; // Show loading text until the user data is available
  }

  return (
    <div>
      <h1>Welcome, {user.name}!</h1>
      <img src={user.profilePicture} alt="Profile" />
      <p>Email: {user.email}</p>
      <p>Currency Preference: {user.currencyPreference}</p>
    </div>
  );
};

export default Dashboard;
