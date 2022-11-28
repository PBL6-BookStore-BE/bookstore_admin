import { createAsyncThunk } from "@reduxjs/toolkit";
import authAPI from "../../../apis/auth.api";

const register = createAsyncThunk("auth/register", async (data) => {
  const response = await authAPI.register(data);
  return response.data;
});

const login = createAsyncThunk("auth/login", async (data) =>
  authAPI.login(data)
);

const forgotPassword = createAsyncThunk("auth/forgotPassword", (data) =>
  authAPI.forgotPassword(data)
);

const resetPassword = createAsyncThunk("auth/resetPassword", (data) =>
  authAPI.resetPassword(data)
);

export { register, login, forgotPassword, resetPassword };
