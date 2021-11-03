import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { partition, random } from "lodash";

import { getHowManyActionPointsToMove } from "./components/Board/utils/movingUtils";
import { getInitialBoardAndUnitsState } from "./components/Board/utils/initializeUtils";

import { BoardState, Unit, UnitTemplateWithCount } from "./types";
import {
  getDeadBody,
  isUnitDead,
  getHowManyUnitsDied,
} from "./components/Board/utils/attackUtils";

const initialState: BoardState = {
  board: [],
  units: [],
  deadUnits: [],
  lastAction: "The battle has began!",
  myName: "player 1", // TODO: Take it from user controller
  opponentName: "player 2",
  winner: "",
  isOnline: false,
};

export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    initBoard: (
      state,
      action: PayloadAction<{
        firstPlayerUnitTemplates: Array<UnitTemplateWithCount>;
        secondPlayerUnitTemplates: Array<UnitTemplateWithCount>;
        userName: string;
        opponentName: string;
      }>
    ) => {
      const {
        firstPlayerUnitTemplates,
        secondPlayerUnitTemplates,
        opponentName,
        userName,
      } = action.payload;
      state.opponentName = opponentName;
      const { units, board, activeUnit } = getInitialBoardAndUnitsState(
        firstPlayerUnitTemplates,
        secondPlayerUnitTemplates,
        userName,
        opponentName
      );
      state.units = units;
      state.board = board;
      state.activeUnit = activeUnit;
      state.winner = "";
    },

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
      if (!state.activeUnit) throw Error("No active unit found!"); // TODO: Move this checking logic somewhere
      const { prevX, prevY, nextX, nextY, id } = action.payload;
      const { units } = state;
      const unitIndex = units.findIndex(({ id: currID }) => currID === id);
      const movingUnit = units[unitIndex];
      movingUnit.coordinates = state.activeUnit.coordinates = {
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
      state.lastAction = `${movingUnit.unitType} is moving to coordinate ${nextX} ${nextY}`;
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
      if (!state.isOnline && nextActiveUnit.owner !== state.myName) {
        [state.opponentName, state.myName] = [state.myName, state.opponentName];
      }
    },

    attack: (
      state,
      action: PayloadAction<{ attacker: Unit; defender: Unit }>
    ) => {
      if (!state.activeUnit) throw Error("No active unit found!"); // TODO: Move this checking logic somewhere
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

    checkForWinner: (
      state,
      action: PayloadAction<{ userName: string; opponentName: string }>
    ) => {
      const { userName, opponentName } = action.payload;
      const units = partition(state.units, ({ owner }) => {
        return owner === userName;
      });
      const [myUnits, opponentUnits] = units;
      if (state.activeUnit) {
        if (myUnits.length === 0) state.winner = opponentName;
        if (opponentUnits.length === 0) state.winner = userName;
      }
    },
  },
});

export const { initBoard, moveToSquare, nextTurn, attack, checkForWinner } =
  gameSlice.actions;

export default gameSlice.reducer;
