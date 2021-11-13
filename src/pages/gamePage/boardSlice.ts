import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { partition } from "lodash";

import { getHowManyActionPointsToMove } from "./components/Board/utils/movingUtils";
import { getInitialBoardAndUnitsState } from "./components/Board/utils/initializeUtils";

import { BoardState, SpellName, Unit, UnitTemplateWithCount } from "./types";
import {
  getDeadBody,
  isUnitDead,
  getHowManyUnitsDied,
} from "./components/Board/utils/attackUtils";
import { applySpellEffect } from "./components/Spellbook/spellEffects";

const initialState: BoardState = {
  board: [],
  units: [],
  deadUnits: [],
  lastAction: "The battle has began!",
  myName: "player 1", // TODO: Take it from user controller
  opponentName: "player 2",
  winner: "",
  isOnline: false,
  spellStack: { isCasting: false, spellName: undefined, cost: 0 },
  turn: 0,
  spellPoints: { isTired: false, max: 10, current: 10 },
  opponentSpellPoints: { isTired: false, max: 10, current: 10 },
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
      state.lastAction = "The battle has began!";
      state.deadUnits = [];
      [state.myName, state.opponentName] =
        activeUnit.owner === userName
          ? [userName, opponentName]
          : [opponentName, userName];
      state.spellStack = { isCasting: false, spellName: undefined, cost: 0 };
      state.turn = 0;
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
      if (nextActiveUnitArrayPosition < prevUnitIndex) {
        ++state.turn;
        state.spellPoints.isTired = state.opponentSpellPoints.isTired = false;
      }
      const nextActiveUnit = units[nextActiveUnitArrayPosition];
      state.activeUnit = nextActiveUnit;
      if (!state.isOnline && nextActiveUnit.owner !== state.myName) {
        [state.opponentName, state.myName] = [state.myName, state.opponentName];
        [state.opponentSpellPoints, state.spellPoints] = [
          state.spellPoints,
          state.opponentSpellPoints,
        ];
        state.lastAction = `The turn goes to ${state.opponentName}`;
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

    concede: (state) => {
      state.winner = state.opponentName;
    },

    startCastSpell: (
      state,
      action: PayloadAction<{ spellName: SpellName; cost: number }>
    ) => {
      const { spellName, cost } = action.payload;
      state.spellStack.cost = cost;
      state.spellStack.isCasting = true;
      state.spellStack.spellName = spellName;
    },

    castSpell: (state, action: PayloadAction<{ x: number; y: number }>) => {
      const { x, y } = action.payload;
      if (!state.spellStack.spellName) return state;
      const { board, units, deadUnits, lastAction } = applySpellEffect({
        spellName: state.spellStack.spellName,
        board: state.board,
        units: state.units,
        deadUnits: state.deadUnits,
        lastAction: state.lastAction,
        target: { x, y },
      });
      state.spellPoints.current -= state.spellStack.cost;
      state.spellPoints.isTired = true;
      state.spellStack.isCasting = false;
      state.spellStack.spellName = undefined;
      state.board = board;
      state.units = units;
      state.deadUnits = deadUnits;
      state.lastAction = lastAction;
    },
  },
});

export const {
  initBoard,
  moveToSquare,
  nextTurn,
  attack,
  checkForWinner,
  concede,
  startCastSpell,
  castSpell,
} = gameSlice.actions;

export default gameSlice.reducer;
