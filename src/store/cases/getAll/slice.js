import { createSlice } from "@reduxjs/toolkit";
import { listAuthors, listBooks, listCategories, listPublishers } from "./action";

const initialState = {
  categories: {
    isFetching: false,
    data: [],
  },
  authors: {
    isFetching: false,
    data: [],
  },
  books: {
    isFetching: false,
    data: [],
  },
  publishers: {
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
      state.books.isFetching = true;
    },
    hideLoading: (state) => {
      state.categories.isFetching = false;
      state.authors.isFetching = false;
      state.books.isFetching = false;
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
      })
      .addCase(listBooks.pending, (state) => {
        state.books.isFetching = true;
      })
      .addCase(listBooks.fulfilled, (state, action) => {
        state.books.isFetching = false;
        state.books.data = action.payload;
      })
      .addCase(listBooks.rejected, (state) => {
        state.books.isFetching = false;
      })
      .addCase(listPublishers.pending, (state) => {
        state.publishers.isFetching = true;
      })
      .addCase(listPublishers.fulfilled, (state, action) => {
        state.publishers.isFetching = false;
        state.publishers.data = action.payload;
      })
      .addCase(listPublishers.rejected, (state) => {
        state.publishers.isFetching = false;
      });
  },
});

export const { showLoading, hideLoading, toggleSidebar } = getAllSlice.actions;

export const getAllReducer = getAllSlice.reducer;
