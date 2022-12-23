import apiClient from "../../../utils/apiClient";
import { clearValues, getStaffBySearch } from "./slice";
import { createStaff } from "../../../apis/staff.api";
import { createAsyncThunk } from "@reduxjs/toolkit";

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
        console.log(response.data);
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