import { createSlice } from "@reduxjs/toolkit";
import { getInforUser } from "./action";

const initialState = {
    isLoading: false,
    userInfo: [],
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getInforUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getInforUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.userInfo = action.payload;
            })
            .addCase(getInforUser.rejected, (state) => {
                state.isLoading = false;
            })
    }
});

export const userReducer = userSlice.reducer;