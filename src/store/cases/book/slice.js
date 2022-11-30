import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { createBookThunk } from "./action";
const initialBookState = {
  addBook: {
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
  editAuthorId: '',
  isModalDelAuthorOpen: false,
  isModalAddOpen: false,
  isLoading: false,
};

export const createBook = createAsyncThunk('book/createBook', createBookThunk);

const bookSlice = createSlice({
  name: "book",
  initialState: initialBookState,
  reducers: {
    handleChange : (state, { payload: { name, value } }) => {
      state.addBook[name] = value;
    },
    clearValues: (state) => {
        state.addBook = {
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
    setEditAuthor: (state, { payload }) => {
        return { ...state, isEditing: true, ...payload };
    }, 
    toggleModalDelAuthor: (state) => {
        state.isModalDelAuthorOpen = !state.isModalDelAuthorOpen;
    },
    toggleModalAdd: (state) => {
        state.isModalAddOpen = !state.isModalAddOpen;
        state.isEditing = false;
    },
    addImageBook: (state, { payload }) => {
      state.addBook.list_img.push(payload)
    },
    addIdAuthor: (state, action) => {
      if (action.payload) {
        state.addBook.idAuthors.push(action.payload.value);
      }
    },
    removeIdAuthor: (state) => {
      state.addBook.idAuthors = [];
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
        toast.success('Error');
      })

  },
});

export const { handleChange, clearValues, setEditAuthor, toggleModalDelAuthor, toggleModalAdd, addImageBook, addIdAuthor, removeIdAuthor } = bookSlice.actions;
export default bookSlice.reducer;
