 import { createSlice } from "@reduxjs/toolkit";
import { forgotPassword, login, register, resetPassword } from "./action";
import { toast } from "react-toastify";

const initialState = {
  message: "",
  // user: '',
  user: localStorage.getItem("user"),
  email: "",
  token: "",
  roles: [localStorage.getItem("roles")],
  loading: false,
  error: "",
  isLogged: !!localStorage.getItem("token"),
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    addToken: (state) => {
      state.token = localStorage.getItem("token");
    },
    addUserName: (state) => {
      state.user = localStorage.getItem("userName");
    },
    logout: (state) => {
      toast.success('Logout successfully')
      state.isLogged = false;
      state.token='';
      state.user=null;
      state.message='';
      state.email='';
      state.roles=[];
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      localStorage.removeItem('message');
      localStorage.removeItem('roles');
      localStorage.clear();
    },
  },
  extraReducers: {
    [register.pending]: (state) => {
      state.loading = true;
    },
    [register.fulfilled]: (state, action) => {
      state.loading = false;
      if (!action.payload.isSuccess) {
        state.error = action.payload.message;
      } else {
        state.error = "";
        state.message = action.payload.message;
      }
    },
    [register.rejected]: (state) => {
      state.loading = true;
    },
    // Login
    [login.pending]: (state) => {
      state.loading = true;
    },
    [login.fulfilled]: (state, action) => {
      state.isLogged = true;
      state.loading = false;
      if (!action.payload.data.isSuccess) {
        state.error = action.payload.data.message;
        toast.error(action.payload.data.message);
      } else {
        state.error = "";
        state.message = action.payload.data.message;
        state.token = action.payload.data.token;
        state.user = action.payload.data.userName;
        state.email = action.payload.data.email;
        state.roles = action.payload.data.roles;

        localStorage.setItem("message", action.payload.data.message);
        localStorage.setItem("user", action.payload.data.userName);
        localStorage.setItem("token", action.payload.data.token);
        localStorage.setItem("roles", action.payload.data.roles);
      }
      if(action.payload.data.roles[0] !== "Administrator"){
        toast.error('You not allowed to login');
      }
      else{
        toast.success('Login successfully');
      }
    },
    [login.rejected]: (state) => {
      state.loading = true;
    },
    [forgotPassword.pending]: (state) => {
      state.loading = true;
    },
    [forgotPassword.fulfilled]: (state, action) => {
      state.loading = false;
      if (!action.payload.isSuccess) {
        state.error = action.payload.message;
      } else {
        state.error = "";
        state.message = action.payload.message;
      }
    },
    [forgotPassword.rejected]: (state) => {
      state.loading = true;
    },
    [resetPassword.pending]: (state) => {
      state.loading = true;
    },
    [resetPassword.fulfilled]: (state, action) => {
      state.loading = false;
      if (!action.payload.isSuccess) {
        state.error = action.payload.message;
      } else {
        state.error = "";
        state.message = action.payload.message;
      }
    },
    [resetPassword.rejected]: (state) => {
      state.loading = true;
    },
  },
});

export const { addToken, addUserName, logout } = authSlice.actions;

export const authReducer = authSlice.reducer;
