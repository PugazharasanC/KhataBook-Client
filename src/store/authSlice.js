// src/store/authSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: localStorage.getItem("userToken") || null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
      localStorage.setItem("userToken", action.payload); // Store token in localStorage
    },
    logout: (state) => {
      state.token = null;
      localStorage.removeItem("userToken");
    },
  },
});

export const { setToken, logout } = authSlice.actions;

export default authSlice.reducer;
