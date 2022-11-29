import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAuthors } from "../../../apis/author.api";
import { getCategories } from "../../../apis/category.api";

const listCategories = createAsyncThunk("categories", async () => getCategories());
const listAuthors = createAsyncThunk("authors", async () => getAuthors());
 
export { listCategories, listAuthors };
