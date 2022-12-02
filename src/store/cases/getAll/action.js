import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAuthors } from "../../../apis/author.api";
import { getCategories } from "../../../apis/category.api";
import { getPublishers } from "../../../apis/publisher.api";
import apiClient from "../../../utils/apiClient";


const listCategories = createAsyncThunk("categories", async () => getCategories());
const listAuthors = createAsyncThunk("authors", async () => getAuthors());
const listPublishers = createAsyncThunk("publishers", async () => getPublishers());

export const getCategoryBySearchThunk = async(_, thunkAPI) => {
    const { categories } = thunkAPI.getState().getAll;
    let url = `/searchcategory`;
    if(categories.search) {
        url = `/searchcategory?name=${categories.search}`
    }
    if(categories.searchInSelect) {
        url = `/searchcategory?name=${categories.searchInSelect}`
    }
    try {
        const response = await apiClient.get(url);
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue('There was an error');
    }
};
export const getPublisherBySearchThunk = async(_, thunkAPI) => {
    const { publishers } = thunkAPI.getState().getAll;
    let url = `/searchpublisher`;
    if(publishers.search) {
        url = `/searchpublisher?name=${publishers.search}`
    }
    if(publishers.searchInSelect) {
        url = `/searchpublisher?name=${publishers.searchInSelect}`
    }
    try {
        const response = await apiClient.get(url);
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue('There was an error');
    }
};
export const getAuthorBySearchThunk = async(_, thunkAPI) => {
    const { authors } = thunkAPI.getState().getAll;
    let url = `/searchauthor`;
    if(authors.search) {
        url = `/searchauthor?name=${authors.search}`
    }
    if(authors.searchInSelect) {
        url = `/searchauthor?name=${authors.searchInSelect}`
    }
    try {
        const response = await apiClient.get(url);
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue('There was an error');
    }
};
export { listCategories, listAuthors, listPublishers };
