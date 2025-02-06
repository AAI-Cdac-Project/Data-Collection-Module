import { createSlice } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";

const initialState = {
  isAuthenticated:false,
  userId:null,
  email: null,
  token: null,
  role: null,
  fullName:null,
};

const authSlice = createSlice({
  name: "auth",
  initialState:initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { token, email, role, userId , fullName} = action.payload;
      if (token) {
        const decodedToken = jwtDecode(token);
        state.email = decodedToken.user || email;
        state.role = decodedToken.role || role;
        state.userId = userId;
        state.fullName=fullName
        state.token = token;
        state.isAuthenticated=true;
        // Store token in localStorage
        localStorage.setItem("token",token);
      } else {
        // Handle when token is null
        state.user = email;
        state.userId = userId;
        state.role = role;
        state.fullName=fullName;
        state.token = null;
        state.isAuthenticated=true;
        localStorage.removeItem("token");
      }
    },
    logout: (state) => {
      state.user = null;
      state.role = null;
      state.token = null;
      state.fullName=null;
      state.isAuthenticated=false;
      localStorage.removeItem("token");
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
