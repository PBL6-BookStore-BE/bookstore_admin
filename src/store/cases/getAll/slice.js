import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { listAuthors, listCategories, listPublishers, getCategoryBySearchThunk, getPublisherBySearchThunk } from "./action";

const initialFiltersState = {
    search: '',
    searchInSelect: '',
}

const initialState = {
  categories: {
    isFetching: false,
    data: [],
    dataInSelect: [],
    ...initialFiltersState,
  },
  authors: {
    isFetching: false,
    data: [],
  },
  publishers: {
    isFetching: false,
    data: [],
    dataInSelect: [],
    search: '',
    searchInSelect: '',
  },
  isSidebarOpen: false,

};
export const getCategoryBySearch = createAsyncThunk('search/getCategoryBySearch', getCategoryBySearchThunk);
export const getPublisherBySearch = createAsyncThunk('search/getPublisherBySearch', getPublisherBySearchThunk);

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
    handleChange: (state, { payload: { name, value }}) => {
        state.categories[name] = value;
        state.publishers[name] = value;
    },
    clearValueSearch: (state) => {
      state.categories.search = ''
      state.publishers.search = ''
    },
    clearValueSearchInSelect: (state) => {
      state.categories.searchInSelect = ''
      state.publishers.searchInSelect = ''
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(listCategories.pending, (state) => {
        state.categories.isFetching = true;
      })
      .addCase(listCategories.fulfilled, (state, action) => {
        state.categories.isFetching = false;
        state.categories.dataInSelect = action.payload;
      })
      .addCase(listCategories.rejected, (state) => {
        state.categories.isFetching = false;
      })
      .addCase(getCategoryBySearch.pending, (state) => {
        state.categories.isFetching = true;
      })
      .addCase(getCategoryBySearch.fulfilled, (state, action) => {
        state.categories.isFetching = false;
        state.categories.data = action.payload;
      })
      .addCase(getCategoryBySearch.rejected, (state) => {
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
      .addCase(listPublishers.pending, (state) => {
        state.publishers.isFetching = true;
      })
      .addCase(listPublishers.fulfilled, (state, action) => {
        state.publishers.isFetching = false;
        state.publishers.dataInSelect = action.payload;
      })
      .addCase(listPublishers.rejected, (state) => {
        state.publishers.isFetching = false;
      })
      .addCase(getPublisherBySearch.pending, (state) => {
        state.publishers.isFetching = true;
      })
      .addCase(getPublisherBySearch.fulfilled, (state, action) => {
        state.publishers.isFetching = false;
        state.publishers.data = action.payload;
      })
      .addCase(getPublisherBySearch.rejected, (state) => {
        state.publishers.isFetching = false;
      });
  },
});

export const { showLoading, hideLoading, toggleSidebar, handleChange, clearValueSearch, clearValueSearchInSelect} = getAllSlice.actions;

export const getAllReducer = getAllSlice.reducer;
