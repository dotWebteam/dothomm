import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getHowManyActionPointsToMove } from "./components/Board/utils/movingUtils";
import {
  getInitialUnitsState,
  getInitialBoardState,
} from "./components/Board/utils/initializeUtils";

import { BoardState, Unit } from "./types";
import { isUnitDead } from "./components/Board/utils/attackUtils";

const initialState: BoardState = {
  board: getInitialBoardState(),
  units: getInitialUnitsState(),
  activeUnit: getInitialUnitsState()[0],
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

    attack: (
      state,
      action: PayloadAction<{ attacker: Unit; defender: Unit }>
    ) => {
      const { attacker } = action.payload;
      const { id: attackerID } = attacker;
      const { id: defenderID } = action.payload.defender;
      const { units } = state;
      const attackerUnit = units.find(({ id }) => id === attackerID);
      const defenderUnit = units.find(({ id }) => id === defenderID);
      if (attackerUnit && defenderUnit) {
        defenderUnit.healthPoints.current -= attackerUnit.attack;
        if (isUnitDead(defenderUnit)) {
          defenderUnit.isDead = true;
        }
        state.activeUnit.actionPoints.current -= 1;
      }
    },
  },
});

export const { moveToSquare, nextTurn, attack } = gameSlice.actions;

export default gameSlice.reducer;
