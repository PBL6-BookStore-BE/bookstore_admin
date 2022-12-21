import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getDailySalesThunk, getMonthlySalesThunk, PendingOrders, getYearlySalesThunk, getDailyTotalOrdersThunk, getDailyPaypalIncomeThunk } from "./action";

const initialState = {
    isLoading: false,
    dataYearly: [],
    dataMonthly: [],
    dataDaily: [],
    isTotalOrders: false,
    isTotalPaypal: false,
    isTotalPending: false,
    totalOrders: 0,
    totalPending: 0,
    totalPaypal: 0,
};

export const getYearlySales = createAsyncThunk('order/getYearlySales', getYearlySalesThunk);
export const getMonthlySales = createAsyncThunk('order/getMonthlySales', getMonthlySalesThunk);
export const getDailySales = createAsyncThunk('order/getDailySales', getDailySalesThunk);

export const getDailyTotalOrders = createAsyncThunk('order/getDailyTotalOrders', getDailyTotalOrdersThunk);
export const getDailyPaypalIncome = createAsyncThunk('order/getDailyPaypalIncome', getDailyPaypalIncomeThunk);

const statSlice = createSlice({
    name: 'stat',
    initialState,
    reducer: {},
    extraReducers: (builder) => {
        builder
            .addCase(getMonthlySales.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getMonthlySales.fulfilled, (state, action) => {
                state.isLoading = false;
                state.dataMonthly = action.payload;
            })
            .addCase(getMonthlySales.rejected, (state) => {
                state.isLoading = false;
            })
            .addCase(getYearlySales.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getYearlySales.fulfilled, (state, action) => {
                state.isLoading = false;
                state.dataYearly = action.payload;
            })
            .addCase(getYearlySales.rejected, (state) => {
                state.isLoading = false;
            })
            .addCase(getDailySales.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getDailySales.fulfilled, (state, action) => {
                state.isLoading = false;
                state.dataDaily = action.payload;
            })
            .addCase(getDailySales.rejected, (state) => {
                state.isLoading = false;
            })
            .addCase(getDailyTotalOrders.pending, (state) => {
                state.isTotalOrders = true;
            })
            .addCase(getDailyTotalOrders.fulfilled, (state, action) => {
                state.isTotalOrders = false;
                state.totalOrders = action.payload;
            })
            .addCase(getDailyTotalOrders.rejected, (state) => {
                state.isTotalOrders = false;
            })
            .addCase(PendingOrders.pending, (state) => {
                state.isTotalPending = true;
            })
            .addCase(PendingOrders.fulfilled, (state, action) => {
                state.isTotalPending = false;
                state.totalPending = action.payload;
            })
            .addCase(PendingOrders.rejected, (state) => {
                state.isTotalPending = false;
            })
            .addCase(getDailyPaypalIncome.pending, (state) => {
                state.isTotalPaypal = true;
            })
            .addCase(getDailyPaypalIncome.fulfilled, (state, action) => {
                state.isTotalPaypal = false;
                state.totalPaypal = action.payload;
            })
            .addCase(getDailyPaypalIncome.rejected, (state) => {
                state.isTotalPaypal = false;
            })
    }
});

export default statSlice.reducer;
