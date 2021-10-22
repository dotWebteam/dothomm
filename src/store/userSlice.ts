import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  nickname: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (
      state,
      action: PayloadAction<{
        nickname: string;
      }>
    ) => {
      const { nickname } = action.payload;
      state.nickname = nickname;
    },

    logout: (state) => {
      state.nickname = "";
    },
  },
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
