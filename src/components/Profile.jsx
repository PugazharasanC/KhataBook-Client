// src/pages/Profile.jsx
import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosConfig";
import { useSelector } from "react-redux";

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  // Fetch profile data
  useEffect(() => {
    if (!token) {
      navigate("/login"); // Redirect to login if no token exists
    } else {
      axiosInstance
        .get("/user/profile")
          .then((response) => {
            console.log(response.data);
          setUserData(response.data); // Set user data to state
        })
        .catch((error) => {
          console.error("Error fetching profile:", error);
          navigate("/login"); // Redirect to login if an error occurs
        });
    }
  }, [navigate]);

  return (
    <div className="max-w-7xl mx-auto p-4">
      {userData ? (
        <div>
          <h1 className="text-3xl font-bold">Profile</h1>
          <div className="mt-4">
            <p>
              <strong>Username:</strong> {userData.username}
            </p>
            <p>
              <strong>Email:</strong> {userData.email}
            </p>
            <p>
              <strong>Created At:</strong>{" "}
              {new Date(userData.createdAt).toLocaleDateString()}
            </p>
            <p>
              <strong>Updated At:</strong>{" "}
              {new Date(userData.updatedAt).toLocaleDateString()}
            </p>
          </div>
        </div>
      ) : (
        <p>Loading...</p> // Show a loading message while data is being fetched
      )}
    </div>
  );
};

export default Profile;
