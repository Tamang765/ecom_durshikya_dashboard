import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slice/authSlice";
import categoryReducer from "./slice/categorySlice";

export default configureStore({
  reducer: {
    auth: authReducer,
    category: categoryReducer,
  },
});
