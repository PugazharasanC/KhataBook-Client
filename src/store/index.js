import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import transactionReducer from "./transactionSlice";
import categoryReducer from "./categorySlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    transactions: transactionReducer,
    category: categoryReducer,
  },
});

export default store;
