import { configureStore } from "@reduxjs/toolkit";
import gameReducer from "../pages/gamePage/boardSlice";
import userReducer from "./userSlice";
import lobbySlice from "../pages/lobbyPage/lobbySlice";

export const store = configureStore({
  reducer: {
    game: gameReducer,
    user: userReducer,
    lobby: lobbySlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
