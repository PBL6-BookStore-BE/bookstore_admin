import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { updateStatusThunk } from "./action";

const initialOrderState = {
  isFetching: false,
}

export const updateStatus = createAsyncThunk('order/updateStatus', updateStatusThunk)

const orderSlice = createSlice({
  name: "order",
  initialState: initialOrderState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateStatus.pending, (state) => {
        state.isFetching = true;
      })
      .addCase(updateStatus.fulfilled, (state) => {
          state.isFetching = false;
      })
      .addCase(updateStatus.rejected, (state) => {
          state.isFetching = false;
          toast.error('Can not update status!');
      })
  },
});

export default orderSlice.reducer;