import { createSlice } from "@reduxjs/toolkit";
import { listAuthors, listCategories } from "./action";

const initialState = {
  categories: {
    isFetching: false,
    data: [],
  },
  authors: {
    isFetching: false,
    data: [],
  },
  isSidebarOpen: false,

};

export const getAllSlice = createSlice({
  name: "getAll",
  initialState,
  reducers: {
    toggleSidebar:(state) => {
      state.isSidebarOpen = !state.isSidebarOpen;
    }, 
    showLoading: (state) => {
      state.categories.isFetching = true;
      state.authors.isFetching = true;
    },
    hideLoading: (state) => {
      state.categories.isFetching = false;
      state.authors.isFetching = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(listCategories.pending, (state) => {
        state.categories.isFetching = true;
      })
      .addCase(listCategories.fulfilled, (state, action) => {
        state.categories.isFetching = false;
        state.categories.data = action.payload;
      })
      .addCase(listCategories.rejected, (state) => {
        state.categories.isFetching = false;
      })
      .addCase(listAuthors.pending, (state) => {
        state.authors.isFetching = true;
      })
      .addCase(listAuthors.fulfilled, (state, action) => {
        state.authors.isFetching = false;
        state.authors.data = action.payload;
      })
      .addCase(listAuthors.rejected, (state) => {
        state.authors.isFetching = false;
      });
  },
});

export const { showLoading, hideLoading, toggleSidebar } = getAllSlice.actions;

export const getAllReducer = getAllSlice.reducer;
