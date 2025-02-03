import { createSlice } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";

const initialState = {
  isAuthenticated:false,
  userId:null,
  user: null,
  token: null,
  role: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState:initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { token, username, role,userId } = action.payload;
      console.log("from authslice","token",token,"username",username,"role",role);
      if (token) {
        const decodedToken = jwtDecode(token);
        state.user = decodedToken.user || username;
        state.role = decodedToken.role || role;
        state.userId = userId;
        state.token = token;
        state.isAuthenticated=true;
        // Store token in localStorage
        localStorage.setItem("token",token);
      } else {
        // Handle when token is null
        state.user = username;
        state.userId = userId;
        state.role = role;
        state.token = null;
        state.isAuthenticated=true;
        localStorage.removeItem("token");
      }
    },
    logout: (state) => {
      state.user = null;
      state.role = null;
      state.token = null;
      state.isAuthenticated=false;
      localStorage.removeItem("token");
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
