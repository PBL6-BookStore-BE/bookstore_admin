import { updateState } from "../../../apis/customer.api";
import apiClient from "../../../utils/apiClient";

export const getCustomerBySearchThunk = async (_, thunkAPI) => {
    const { search } = thunkAPI.getState().customer;
    let url = `/dashboard/customers`
    if(search){
        url = `/dashboard/customers?phone=${search}`
        if(isNaN(search)){
            url = `/dashboard/customers?email=${search}`
        }
    }
    try {
        const response = await apiClient.get(url);
        return response.data
    } catch (error) {
        return thunkAPI.rejectWithValue('There was an error');
    }
};

export const updateStateThunk = async (data, thunkAPI) => {
    try {
        const response = await updateState(data);
        return response.data;
    } catch (error) {
        console.log(error)
        return thunkAPI.rejectWithValue(error.response.data);
    }
};