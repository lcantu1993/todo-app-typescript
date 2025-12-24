import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../api/client";
import { Category } from "../types";

export const fetchCategories = createAsyncThunk("categories/fetch", () =>
  api<Category[]>("/categories")
);

export const createCategory = createAsyncThunk(
  "categories/create",
  (data: { name: string }) =>
    api<Category>("/categories", {
      method: "POST",
      body: JSON.stringify(data)
    })
);

const slice = createSlice({
  name: "categories",
  initialState: [] as Category[],
  reducers: {},
  extraReducers: (b) => {
    b.addCase(fetchCategories.fulfilled, (_, a) => a.payload);
    b.addCase(createCategory.fulfilled, (state, a) => {
      state.push(a.payload);
    });
  }
});

export default slice.reducer;
