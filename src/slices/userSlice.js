import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Async Thunk to fetch user data
export const fetchUserData = createAsyncThunk(
  "user/fetchUserData",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const token = state.user.token; // Get JWT token from Redux state

    if (!token) {
      return thunkAPI.rejectWithValue("No token found");
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/dashboard`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`, // Pass the JWT token in headers
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch user data");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    token: null,
    loading: false,
    error: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    logoutUser: (state) => {
      state.user = null;
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.user = action.payload; // Store user data in the state
        state.loading = false;
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setUser, logoutUser } = userSlice.actions;

export default userSlice.reducer;
