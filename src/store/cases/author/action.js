import { createAuthor, deleteAuthor, editAuthor } from '../../../apis/author.api';
import { hideLoading, showLoading, getAuthorBySearch } from '../getAll/slice';
import { clearValues } from './slice';

export const createAuthorThunk = async (data, thunkAPI) => {
    thunkAPI.dispatch(clearValues());
    try {
        const response = await createAuthor(data);
        thunkAPI.dispatch(getAuthorBySearch());
        return response.data
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
};

export const deleteAuthorThunk = async (dataId, thunkAPI) => {
    thunkAPI.dispatch(showLoading());
    try {
        const response = await deleteAuthor(dataId);
        thunkAPI.dispatch(getAuthorBySearch());
        return response.data
    } catch (error) {
        thunkAPI.dispatch(hideLoading());
        return thunkAPI.rejectWithValue(error.response.data);
    }
};

export const editAuthorThunk = async (data, thunkAPI) => {
    thunkAPI.dispatch(showLoading());
    try {
        const response = await editAuthor(data);
        thunkAPI.dispatch(clearValues());
        thunkAPI.dispatch(getAuthorBySearch());
        return response.data
    } catch (error) {
        thunkAPI.dispatch(hideLoading());
        return thunkAPI.rejectWithValue(error.response.data);
    }
};