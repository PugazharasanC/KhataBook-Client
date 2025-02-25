import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../utils/axiosConfig";
import { toast } from "react-toastify"; // Import toast

// Async thunk for fetching transactions
export const fetchTransactions = createAsyncThunk(
  "transactions/fetchTransactions",
  async () => {
    try {
      const response = await axiosInstance.get("/transactions");
      return response.data;
    } catch (err) {
      throw new Error(err.response.data.message);
    }
  }
);

// Async thunk for adding a transaction
export const addTransaction = createAsyncThunk(
  "transactions/addTransaction",
  async (transactionData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        "/transactions",
        transactionData
      );
      console.log(response);
      return response.data; // response contains the transaction and balance
    } catch (err) {
      return rejectWithValue(err.response.data.message); // Return error message to be handled
    }
  }
);

// Async thunk for getting balance
export const fetchBalance = createAsyncThunk(
  "transactions/fetchBalance",
  async () => {
    try {
      const response = await axiosInstance.get("/balance");
      return response.data;
    } catch (err) {
      throw new Error(err.response.data.message);
    }
  }
);

const transactionSlice = createSlice({
  name: "transactions",
  initialState: {
    transactions: [],
    balance: { currentBalance: 0, loanBalance: 0 },
    status: "idle",
    error: null,
  },
  reducers: {
    setBalance: (state, action) => {
      state.balance = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Fetch transactions
    builder
      .addCase(fetchTransactions.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.transactions = action.payload;
      })
      .addCase(fetchTransactions.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });

    // Add transaction
    builder
      .addCase(addTransaction.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addTransaction.fulfilled, (state, action) => {
        state.status = "succeeded";
        // Append the new transaction and update the balance
        state.transactions.unshift(action.payload.transaction);
        state.balance = action.payload.balance;

        // Show success toast when transaction is added
        toast.success("Transaction added successfully!");
      })
      .addCase(addTransaction.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;

        // Show error toast if there's a failure
        toast.error(`Failed to add transaction: ${action.error.message}`);
      });

    // Fetch balance
    builder
      .addCase(fetchBalance.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchBalance.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.balance = action.payload;
      })
      .addCase(fetchBalance.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { setBalance } = transactionSlice.actions;

export default transactionSlice.reducer;
