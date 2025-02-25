// src/store/index.js
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice"; // Assuming you already have authSlice
import transactionReducer from "./transactionSlice"; // Import the newly created transactionSlice

const store = configureStore({
  reducer: {
    auth: authReducer,
    transactions: transactionReducer, // Add transaction reducer
  },
});

export default store;
