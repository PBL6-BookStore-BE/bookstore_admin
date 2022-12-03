import { createPublisher, deletePublisher, editPublisher } from '../../../apis/publisher.api';
import { listPublishers } from '../getAll/action';
import { getPublisherBySearch, hideLoading, showLoading, clearValueSearch, clearValueSearchInSelect } from '../getAll/slice';
import { clearValues } from './slice';

export const createPublisherThunk = async (data, thunkAPI) => {
    thunkAPI.dispatch(clearValues());
    try {
        const response = await createPublisher(data);
        thunkAPI.dispatch(getPublisherBySearch());
        thunkAPI.dispatch(listPublishers());
        return response.data
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
};

export const deletePublisherThunk = async (dataId, thunkAPI) => {
    thunkAPI.dispatch(showLoading());
    try {
        const response = await deletePublisher(dataId);
        thunkAPI.dispatch(getPublisherBySearch());
        thunkAPI.dispatch(listPublishers());
        thunkAPI.dispatch(clearValueSearch());
        thunkAPI.dispatch(clearValueSearchInSelect());
        return response.data
    } catch (error) {
        thunkAPI.dispatch(hideLoading());
        return thunkAPI.rejectWithValue(error.response.data);
    }
};

export const editPublisherThunk = async (data, thunkAPI) => {
    thunkAPI.dispatch(showLoading());
    try {
        const response = await editPublisher(data);
        thunkAPI.dispatch(clearValues());
        thunkAPI.dispatch(getPublisherBySearch());
        thunkAPI.dispatch(listPublishers());
        thunkAPI.dispatch(clearValueSearch());
        thunkAPI.dispatch(clearValueSearchInSelect());
        return response.data
    } catch (error) {
        thunkAPI.dispatch(hideLoading());
        return thunkAPI.rejectWithValue(error.response.data);
    }
};