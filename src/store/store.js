import { combineReducers, configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { authReducer } from "./cases/auth/slice";
import { getAllReducer } from "./cases/getAll/slice";
import categoryReducer from "./cases/category/slice";
import authorReducer from "./cases/author/slice";
import publisherReducer from "./cases/publisher/slice";
import bookReducer from "./cases/book/slice";
import orderRducer from "./cases/order/slice";
import statReducer from "./cases/stat/slice";
import { customerReducer } from "./cases/customer/slice";
import { staffReducer } from "./cases/staff/slice";
import { userReducer } from "./cases/user/slice";

const combinedReducer = combineReducers({
  auth: authReducer,
  getAll: getAllReducer,
  category: categoryReducer,
  author: authorReducer,
  publisher: publisherReducer,
  book: bookReducer,
  order: orderRducer,
  stat: statReducer,
  customer: customerReducer,
  staff: staffReducer,
  user: userReducer,
});

const rootReducer = (state, action) => {
  return combinedReducer(state, action);
};

const store = configureStore({
  reducer: rootReducer,
  middleware: [
    ...getDefaultMiddleware({
      serializableCheck: false,
    }),
  ],
});
export default store;
