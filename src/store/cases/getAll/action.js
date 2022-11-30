import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAuthors } from "../../../apis/author.api";
import { getListBook } from "../../../apis/book.api";
import { getCategories } from "../../../apis/category.api";
import { getPushlishers } from "../../../apis/publisher.api";

const listCategories = createAsyncThunk("categories", async () => getCategories());
const listAuthors = createAsyncThunk("authors", async () => getAuthors());
const listBooks = createAsyncThunk("books", async () => getListBook());
const listPublishers = createAsyncThunk("publishers", async () => getPushlishers());

export { listCategories, listAuthors, listBooks, listPublishers };
