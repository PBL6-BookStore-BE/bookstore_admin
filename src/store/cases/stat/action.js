import { createAsyncThunk } from "@reduxjs/toolkit";
import { getDailyPaypalIncome, getDailySales, getDailyTotalOrders, getMonthlySales, getPendingOrders, getYearlySales } from "../../../apis/stat.api";

export const getYearlySalesThunk = async (data, thunkAPI) => {
    try {
        const response = await getYearlySales(data);
        return response
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
};

export const getMonthlySalesThunk = async (data, thunkAPI) => {
    try {
        const response = await getMonthlySales(data);
        return response
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
};

export const getDailySalesThunk = async (data, thunkAPI) => {
    try {
        const response = await getDailySales(data);
        console.log(response);
        return response
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
};

export const getDailyTotalOrdersThunk = async (data, thunkAPI) => {
    try {
        const response = await getDailyTotalOrders(data);
        return response
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
};

export const getDailyPaypalIncomeThunk = async (data, thunkAPI) => {
    try {
        const response = await getDailyPaypalIncome(data);
        return response
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
};

export const PendingOrders = createAsyncThunk("PendingOrders", async () => getPendingOrders());
