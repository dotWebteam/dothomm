import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  INITIAL_BOARD_STATE,
  INITIAL_UNITS_STATE,
  TEST_UNIT_1,
} from "./components/Board/constants";
import { getHowManyActionPointsToMove } from "./components/Board/utils";

import { BoardState, Unit } from "./types";

const initialState: BoardState = {
  board: INITIAL_BOARD_STATE,
  units: INITIAL_UNITS_STATE,
  activeUnit: TEST_UNIT_1,
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
        id: number;
      }>
    ) => {
      const { prevX, prevY, nextX, nextY, id } = action.payload;
      const { units } = state;
      const unitIndex = units.findIndex(({ id: currID }) => currID === id);
      units[unitIndex].coordinates = state.activeUnit.coordinates = {
        x: nextX,
        y: nextY,
      };
      state.activeUnit.actionPoints.current -= getHowManyActionPointsToMove(
        prevX,
        prevY,
        nextX,
        nextY
      );
      state.board[nextY][nextX].type = "unit";
      state.board[nextY][nextX].unitType = state.board[prevY][prevX].unitType;
      state.board[prevY][prevX] = {};
      state.board[nextY][nextX].id = id;
    },

    nextTurn: (state, action: PayloadAction<{ activeUnit: Unit }>) => {
      const { id: prevActiveUserID } = action.payload.activeUnit;
      const { units } = state;
      const prevUnitIndex = units.findIndex(
        ({ id }) => id === prevActiveUserID
      );
      const nextActiveUnitArrayPosition = (prevUnitIndex + 1) % units.length;
      const nextActiveUnit = units[nextActiveUnitArrayPosition];
      state.activeUnit = nextActiveUnit;
    },
  },
});

export const { moveToSquare, nextTurn } = gameSlice.actions;

export default gameSlice.reducer;
