import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { random } from "lodash";

import { getHowManyActionPointsToMove } from "./components/Board/utils/movingUtils";
import {
  getInitialUnitsState,
  getInitialBoardState,
} from "./components/Board/utils/initializeUtils";

import { BoardState, Unit } from "./types";
import {
  getDeadBody,
  isUnitDead,
  getHowManyUnitsDied,
} from "./components/Board/utils/attackUtils";

const initialState: BoardState = {
  board: getInitialBoardState(),
  units: getInitialUnitsState(),
  activeUnit: getInitialUnitsState()[0],
  deadUnits: [],
  lastAction: "The battle has began!",
  opponentName: "player",
  winner: "",
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
      const movingUnit = units[unitIndex];
      movingUnit.coordinates = state.activeUnit.coordinates = {
        x: nextX,
        y: nextY,
      };
      //
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
      state.lastAction = `${movingUnit.unitType} is moving to coordinate ${nextX} ${nextY}`;
    },
//
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
      const { attacker, defender } = action.payload;
      const { id: attackerID } = attacker;
      const { id: defenderID } = defender;
      const { units } = state;
      const attackerUnit = units.find(({ id }) => id === attackerID);
      const defenderUnit = units.find(({ id }) => id === defenderID);
      if (attackerUnit && defenderUnit) {
        const { unitsKilled, currentUnitHealthPoints } = getHowManyUnitsDied(
          attacker,
          defender
        );
        defenderUnit.healthPoints.current = currentUnitHealthPoints;
        defenderUnit.count -= unitsKilled;
        state.lastAction = `${defender.unitType} of ${defender.owner} was attacked by ${attacker.unitType} of ${attacker.owner}! ${unitsKilled} units was killed`;
        if (isUnitDead(defenderUnit)) {
          units.splice(units.indexOf(defenderUnit), 1);
          state.deadUnits?.push(defenderUnit);
          // clear the board
          const {
            coordinates: { x, y },
          } = defender;
          state.board[y][x] = getDeadBody(defenderID, defender.unitType);
          state.lastAction = `${defender.unitType} of ${defender.owner} was destroyed!`;
        }
        state.activeUnit.actionPoints.current -= 1;
      }
    },

    endGame: (state, action: PayloadAction<{ winnerName: string }>) => {
      state.winner = action.payload.winnerName;
    },
  },
});

export const { moveToSquare, nextTurn, attack, endGame } = gameSlice.actions;

export default gameSlice.reducer;
