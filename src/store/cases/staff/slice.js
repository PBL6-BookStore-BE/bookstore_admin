import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { createAdmin, getStaffBySearchThunk, editProfileStaff } from "./action";

const initialState = {
    search: '',
    staffs: [],
    isLoading: false,
    isLoading1: false,
    isFetching: false,
    isModalAddOpen: false,
    isModalEditOpen: false,
};

export const getStaffBySearch = createAsyncThunk('search/staff', getStaffBySearchThunk);

export const staffSlice = createSlice({
    name: "staff",
    initialState,
    reducers: {
        handleChange: (state, { payload: { name, value }}) => {
            state[name] = value;
        },
        clearValues: (state) => {
            state.fullName='';
            state.username='';
            state.email='';
            state.phone='';
            state.address='';
        },
        toggleModalAdd: (state) => {
            state.isModalAddOpen = !state.isModalAddOpen;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getStaffBySearch.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getStaffBySearch.fulfilled, (state, action) => {
                state.isLoading = false;
                state.staffs = action.payload;
            })
            .addCase(getStaffBySearch.rejected, (state) => {
                state.isLoading = false;
            })
            .addCase(createAdmin.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createAdmin.fulfilled, (state, action) => {
                state.isLoading = false;
            })
            .addCase(createAdmin.rejected, (state) => {
                state.isLoading = false;
                toast.error('Error');
            })
            .addCase(editProfileStaff.pending, (state) => {
                state.isLoading1 = true;
            })
            .addCase(editProfileStaff.fulfilled, (state, action) => {
                state.isLoading1 = false;
                toast.success(action.payload.message)
            })
            .addCase(editProfileStaff.rejected, (state) => {
                state.isLoading1 = false;
                toast.error('Error');
            })
    },
});

export const { handleChange, clearValues, toggleModalAdd } = staffSlice.actions;

export const staffReducer = staffSlice.reducer;
