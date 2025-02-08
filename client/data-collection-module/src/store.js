import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import documentReducer from "./features/document/documentSlice"
const store = configureStore({
  reducer: {
    auth: authReducer,
    document:documentReducer,
  },
});

export default store;
