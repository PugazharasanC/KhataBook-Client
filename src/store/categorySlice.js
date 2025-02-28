import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../utils/axiosConfig";

export const fetchCategories = createAsyncThunk(
  "category/fetchCategories",
  async () => {
    const response = await axiosInstance.get("/category");
    return response.data;
  }
);

const categorySlice = createSlice({
  name: "category",
  initialState: {
    categories: {},
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export default categorySlice.reducer;
