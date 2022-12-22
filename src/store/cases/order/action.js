import { getOrderById, updateStatus } from "../../../apis/order.api";

const updateStatusThunk = async (data, thunkAPI) => {
  try {
      const response = await updateStatus(data);
      return response.data;
  } catch (error) {
      console.log(error)
      return thunkAPI.rejectWithValue(error.response.data);
  }
}

const getDetailOrderThunk = async (id, thunkAPI) => {
  try {
    const response = await getOrderById(id);
    return response.data;
  } catch (error) {
    console.log(error);
    return thunkAPI.rejectWithValue(error.response.data);
  }
}

export { updateStatusThunk, getDetailOrderThunk }