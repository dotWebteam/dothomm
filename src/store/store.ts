import { configureStore } from "@reduxjs/toolkit";
import gameReducer from "../pages/gamePage/boardSlice";

export const store = configureStore({
  reducer: {
    game: gameReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
