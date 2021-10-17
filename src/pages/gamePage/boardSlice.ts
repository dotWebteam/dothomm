import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  INITIAL_BOARD_STATE,
  INITIAL_UNITS_STATE,
  TEST_UNIT,
} from "./components/Board/constants";

import { BoardState } from "./types";

const initialState: BoardState = {
  board: INITIAL_BOARD_STATE,
  units: INITIAL_UNITS_STATE,
  activeUnit: TEST_UNIT,
};

export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    moveToSquare: (
      state,
      action: PayloadAction<{
        prevX: number;
        prevY: number;
        nextX: number;
        nextY: number;
        username: string;
      }>
    ) => {
      const { prevX, prevY, nextX, nextY, username } = action.payload;
      state.board[prevY][prevX].unitName = undefined;
      state.activeUnit.coordinates = { x: nextX, y: nextY };
      state.board[nextY][nextX].unitName = username;
    },
  },
});

export const { moveToSquare } = gameSlice.actions;

export default gameSlice.reducer;
