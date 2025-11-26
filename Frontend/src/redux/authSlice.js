import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: null,
    isAuthenticated: false,
  },
  reducers: {
    // payload ho sakta hai:
    // 1) sirf user object  -> setUser(user)
    // 2) { user, token }   -> setUser({ user, token })
    setUser(state, action) {
      const payload = action.payload;

      if (payload && payload.user && payload.token) {
        state.user = payload.user;
        state.token = payload.token;
      } else {
        state.user = payload;
        state.token = null;
      }

      state.isAuthenticated = true;
    },
    clearUser(state) {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
    },
  },
});

const authReducer = authSlice.reducer;
export const { setUser, clearUser } = authSlice.actions;
export default authReducer;
