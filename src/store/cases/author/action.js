import { createAuthor, deleteAuthor, editAuthor } from '../../../apis/author.api';
import { listAuthors } from '../getAll/action';
import { hideLoading, showLoading } from '../getAll/slice';
import { clearValues } from './slice';

export const createAuthorThunk = async (data, thunkAPI) => {
    try {
        const response = await createAuthor(data);
        thunkAPI.dispatch(clearValues());
        thunkAPI.dispatch(listAuthors());
        return response.data
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
};

export const deleteAuthorThunk = async (dataId, thunkAPI) => {
    thunkAPI.dispatch(showLoading());
    try {
        const response = await deleteAuthor(dataId);
        thunkAPI.dispatch(listAuthors());
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
        thunkAPI.dispatch(listAuthors());
        return response.data
    } catch (error) {
        thunkAPI.dispatch(hideLoading());
        return thunkAPI.rejectWithValue(error.response.data);
    }
};