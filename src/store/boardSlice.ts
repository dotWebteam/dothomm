import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  INITIAL_BOARD_STATE,
  INITIAL_UNITS_STATE,
  TEST_UNIT,
} from "../constants/board";

type SquareState = {
  unitName?: string;
};

type Unit = {
  name: string;
  coordinates: {
    x: number;
    y: number;
  };
};

export interface BoardState {
  board: Array<Array<SquareState>>;
  units: Array<Unit>;
  activeUnit: Unit;
}

const initialState: BoardState = {
  board: INITIAL_BOARD_STATE,
  units: INITIAL_UNITS_STATE,
  activeUnit: TEST_UNIT,
};

export const boardSlice = createSlice({
  name: "board",
  initialState,
  reducers: {
    // increment: (state) => {
    //   // Redux Toolkit allows us to write "mutating" logic in reducers. It
    //   // doesn't actually mutate the state because it uses the Immer library,
    //   // which detects changes to a "draft state" and produces a brand new
    //   // immutable state based off those changes
    //   state.value += 1;
    // },
    // decrement: (state) => {
    //   state.value -= 1;
    // },
    // incrementByAmount: (state, action: PayloadAction<number>) => {
    //   state.value += action.payload;
    // },
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
      console.log(prevX, prevY, state.board[prevY][prevX].unitName);
      state.board[nextY][nextX].unitName = username;
    },
  },
});

export const { moveToSquare } = boardSlice.actions;

export default boardSlice.reducer;
