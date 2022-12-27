import { createAsyncThunk } from "@reduxjs/toolkit";
import { getUser } from "../../../apis/user.api";

export const getInforUser = createAsyncThunk("user/getInforUser", async (email) => getUser(email));