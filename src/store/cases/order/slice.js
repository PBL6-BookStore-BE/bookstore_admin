import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { getDetailOrderThunk, updateStatusThunk } from "./action";

const initialOrderState = {
  isFetching: false,
  data: [],
}

export const updateStatus = createAsyncThunk('order/updateStatus', updateStatusThunk);
export const getOrderById = createAsyncThunk('order/getOrderDetails', getDetailOrderThunk);

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
      .addCase(getOrderById.pending, (state) => {
        state.isFetching = true;
      })
      .addCase(getOrderById.fulfilled, (state, action) => {
        state.isFetching = false;
        state.data = action.payload;
    })
      .addCase(getOrderById.rejected, (state) => {
          state.isFetching = false;
          toast.error('Can not get invoice information!');
      })
  },
});

export default orderSlice.reducer;