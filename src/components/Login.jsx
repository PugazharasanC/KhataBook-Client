// src/components/Login.jsx
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setToken } from "../store/authSlice";
// import axios from "axios";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosConfig";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axiosInstance.post("/auth/login", {
        email,
        password,
      });
      const token = response.data.token;

      // Save the token in Redux store and navigate to dashboard
      dispatch(setToken(token));
      navigate("/dashboard");
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-xl font-bold">Login</h2>
      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label htmlFor="email" className="block">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border"
          />
        </div>
        <div>
          <label htmlFor="password" className="block">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border"
          />
        </div>
        <button type="submit" className="w-full py-2 bg-blue-500 text-white">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
