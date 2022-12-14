import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { createBookThunk, deleteBookThunk, updateBookThunk } from "./action";
const initialBookState = {
  book: {
    name: '',
    price: 0,
    pages: 0,
    publicationDate: '',
    idCategory: 0,
    idPublisher: 0,
    idAuthors: [],
    list_img: [],
    description: ''
  },
  isEditing: false,
  bookId: '',
  isModalDelBookOpen: false,
  isModalAddOpen: false,
  isLoading: false,
  nameBook: '',
  isUpdateImage: false,
};

export const createBook = createAsyncThunk('book/createBook', createBookThunk);
export const updateBook = createAsyncThunk('book/updateBook', updateBookThunk)
export const deleteBook = createAsyncThunk('book/deleteBook', deleteBookThunk);

const bookSlice = createSlice({
  name: "book",
  initialState: initialBookState,
  reducers: {
    handleChange : (state, { payload: { name, value } }) => {
      state.book[name] = value;
    },
    clearValues: (state) => {
        state.book = {
          name: '',
          price: null,
          pages: null,
          publicationDate: '',
          idCategory: null,
          idPublisher: null,
          idAuthors: [],
          list_img: [],
          description: ''
        }
    },
    setEditBook: (state, { payload }) => {
        return { ...state, isEditing: true, ...payload };
    }, 
    toggleModalDelBook: (state) => {
        state.isModalDelBookOpen = !state.isModalDelBookOpen;
    },
    toggleModalAdd: (state) => {
        state.isModalAddOpen = !state.isModalAddOpen;
        state.isEditing = false;
    },
    addImageBook: (state, { payload }) => {
      state.isUpdateImage = true;
      state.book.list_img.push(payload);
    },
    addIdAuthor: (state, action) => {
      if (action.payload) {
        state.book.idAuthors.push(action.payload.value);
      }
    },
    removeIdAuthor: (state) => {
      state.book.idAuthors = [];
    },
    removeImage: (state, action) => {
      state.isUpdateImage = true;
      if (action.payload.startsWith("data:image/")) {
        state.book.list_img = state.book.list_img.filter((item) => item.src !== action.payload);
      } else {
        state.book.list_img = state.book.list_img.filter((item) => item !== action.payload);
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createBook.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createBook.fulfilled, (state) => {
        state.isLoading = false;
        state.isModalAddOpen = false;
        toast.success('Book Created');
      })
      .addCase(createBook.rejected, (state) => {
        state.isLoading = false;
        toast.error('Error');
      })
      .addCase(updateBook.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateBook.fulfilled, (state) => {
          state.isLoading = false;
          state.isModalAddOpen = false;
          state.isUpdateImage = false;
          toast.success('Book Modified...');
          state.isEditing = !state.isEditing;
      })
      .addCase(updateBook.rejected, (state, action) => {
          state.isLoading = false;
          console.log("Error: ", action);
          toast.error('Error');
      })
      .addCase(deleteBook.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteBook.fulfilled, (state) => {
          state.isLoading = false;
          state.isModalAddOpen = false;
          toast.success('Book removed');
          state.isModalDelBookOpen = !state.isModalDelBookOpen;
      })
      .addCase(deleteBook.rejected, (state) => {
          state.isLoading = true;
          toast.error('Error');
      })

  },
});

export const { removeImage, handleChange, clearValues, setEditBook, toggleModalDelBook, toggleModalAdd, addImageBook, addIdAuthor, removeIdAuthor } = bookSlice.actions;
export default bookSlice.reducer;
