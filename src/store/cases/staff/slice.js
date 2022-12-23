import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { createAdmin, createStaffThunk, getStaffBySearchThunk } from "./action";

const initialState = {
    search: '',
    staffs: [],
    isLoading: false,
    isFetching: false,
    isModalAddOpen: false,
    fullName: "",
    username: "",
    email: "",
    phone: "",
    address: ""
};

export const getStaffBySearch = createAsyncThunk('search/staff', getStaffBySearchThunk);
// export const createStaff = createAsyncThunk('staff/createStaff', createStaffThunk);

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
                // state.isModalAddOpen = !state.isModalAddOpen;
            })
            .addCase(createAdmin.rejected, (state) => {
                state.isLoading = false;
                toast.error('Error');
            })
    },
});

export const { handleChange, clearValues, toggleModalAdd } = staffSlice.actions;

export const staffReducer = staffSlice.reducer;
