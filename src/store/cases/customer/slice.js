import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { getCustomerBySearchThunk, updateStateThunk } from "./action";

const initialState = {
    search: '',
    customers: [],
    isLoading: false,
    isFetching: false,
};

export const getCustomerBySearch = createAsyncThunk('search/customer', getCustomerBySearchThunk);
export const updateState = createAsyncThunk('customer/updateState', updateStateThunk);


export const customerSlice = createSlice({
    name: "customer",
    initialState,
    reducers : {
        handleChange: (state, { payload: { name, value }}) => {
        state[name] = value;
    },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getCustomerBySearch.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getCustomerBySearch.fulfilled, (state, action) => {
                state.isLoading = false;
                state.customers = action.payload;
            })
            .addCase(getCustomerBySearch.rejected, (state) => {
                state.isLoading = false;
            })
            .addCase(updateState.pending, (state) => {
                state.isFetching = true;
            })
            .addCase(updateState.fulfilled, (state, action) => {
                state.isFetching = false;
                toast.success(action.payload.message);
            })
            .addCase(updateState.rejected, (state) => {
                state.isFetching = false;
                toast.error('Can not update status!');
            })
    },
});

export const { handleChange} = customerSlice.actions;

export const customerReducer = customerSlice.reducer;