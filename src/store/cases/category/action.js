import { createCate, deleteCate, editCate } from '../../../apis/category.api';
import { listCategories } from '../getAll/action';
import { getCategoryBySearch, hideLoading, showLoading, clearValueSearch, clearValueSearchInSelect } from '../getAll/slice';
import { clearValues } from './slice';

export const createCateThunk = async (data, thunkAPI) => {
    thunkAPI.dispatch(clearValues());
    try {
        const response = await createCate(data);
        thunkAPI.dispatch(getCategoryBySearch());
        thunkAPI.dispatch(listCategories());
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
};

export const deleteCateThunk = async (dataId, thunkAPI) => {
    thunkAPI.dispatch(showLoading());
    try {
        const response = await deleteCate(dataId);
        thunkAPI.dispatch(getCategoryBySearch());
        thunkAPI.dispatch(listCategories());
        thunkAPI.dispatch(clearValueSearch());
        thunkAPI.dispatch(clearValueSearchInSelect());
        return response.data
    } catch (error) {
        thunkAPI.dispatch(hideLoading());
        return thunkAPI.rejectWithValue(error.response.data);
    }
};

export const editCateThunk = async (data, thunkAPI) => {
    thunkAPI.dispatch(showLoading());
    try {
        const response = await editCate(data);
        thunkAPI.dispatch(clearValues());
        thunkAPI.dispatch(getCategoryBySearch());
        thunkAPI.dispatch(listCategories());
        thunkAPI.dispatch(clearValueSearch());
        thunkAPI.dispatch(clearValueSearchInSelect());
        return response.data
    } catch (error) {
        thunkAPI.dispatch(hideLoading());
        return thunkAPI.rejectWithValue(error.response.data);
    }
};