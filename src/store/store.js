import { combineReducers, configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { authReducer } from "./cases/auth/slice";
import { getAllReducer } from "./cases/getAll/slice";
import categoryReducer from "./cases/category/slice";
import authorReducer from "./cases/author/slice";

const combinedReducer = combineReducers({
  auth: authReducer,
  getAll: getAllReducer,
  category: categoryReducer,
  author: authorReducer,
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
