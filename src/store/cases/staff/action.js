import apiClient from "../../../utils/apiClient";
import { getStaffBySearch } from "./slice";
import { createStaff, updateStaff } from "../../../apis/staff.api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { getInforUser } from "../user/action";

export const getStaffBySearchThunk = async (_, thunkAPI) => {
    const { search } = thunkAPI.getState().staff;
    let url = `/dashboard/admins`
    if(search){
        url = `/dashboard/admins?phone=${search}`
        if(isNaN(search)){
            url = `/dashboard/admins?email=${search}`
        }
    }
    try {
        const response = await apiClient.get(url);
        return response.data
    } catch (error) {
        return thunkAPI.rejectWithValue('There was an error');
    }
};

export const createAdmin = createAsyncThunk("register/dashboard", async (data, thunkAPI) => {
    const response = await createStaff(data);
    thunkAPI.dispatch(getStaffBySearch());
    return response.data;
});

export const editProfileStaff = createAsyncThunk("staff/edit", async (data, thunkAPI) => {
    const { email } = thunkAPI.getState().auth;
    const response = await updateStaff(data);
    thunkAPI.dispatch(getInforUser(email));
    return response.data;
});