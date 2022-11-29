import { createAsyncThunk } from "@reduxjs/toolkit";
import { createBook, getBookById } from "../../../apis/book.api";
import { listBooks } from "../getAll/action";
import { clearValues } from "./slice";

const createBookThunk = async (data, thunkAPI) => {
  try {
      const response = await createBook(data);
      thunkAPI.dispatch(clearValues());
      thunkAPI.dispatch(listBooks());
      return response.data;
  } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
  }
};

const BookById = createAsyncThunk("book", async (id) =>
  getBookById(id)
);
export { BookById, createBookThunk };
