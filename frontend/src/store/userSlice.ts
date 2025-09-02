import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type UserState = {
  username: string | null;
  role: string | null;
  isAuthenticated: boolean;
};

const initialState: UserState = {
  username: null,
  role: null,
  isAuthenticated: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(
      state,
      action: PayloadAction<{ username: string; role: string }>
    ) {
      state.username = action.payload.username;
      state.role = action.payload.role;
      state.isAuthenticated = true;
    },
    clearUser(state) {
      state.username = null;
      state.role = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
