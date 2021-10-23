import { SquareState, Unit } from "../../../types";
import {
  NUMBERS_OF_BOARD_ROWS,
  NUMBERS_OF_BOARD_COLUMNS,
} from "../constants/boardConstants";

/** Returns initial units state for game */
export const getInitialUnitsState: () => Unit[] = () => {
  const TEST_UNIT_1: Unit = {
    id: 1,
    unitType: "SWORDSMAN",
    coordinates: { x: 0, y: 2 },
    attack: { min: 2, max: 3 },
    count: 2,
    healthPoints: {
      max: 5,
      current: 5,
    },
    actionPoints: {
      max: 2,
      current: 2,
    },
    owner: "admin",
    isActive: true,
    isDead: false,
  };

  const TEST_UNIT_2: Unit = {
    id: 2,
    unitType: "PEASANT",
    coordinates: { x: 0, y: 3 },
    attack: { min: 2, max: 3 },
    count: 100,
    healthPoints: {
      max: 1,
      current: 1,
    },
    actionPoints: {
      max: 1,
      current: 1,
    },
    owner: "admin",
    isActive: true,
    isDead: false,
  };

  const TEST_UNIT_3: Unit = {
    id: 3,
    unitType: "SWORDSMAN",
    coordinates: { x: 0, y: 4 },
    attack: { min: 2, max: 3 },
    healthPoints: {
      max: 5,
      current: 5,
    },
    count: 20,
    actionPoints: {
      max: 2,
      current: 2,
    },
    owner: "player",
    isActive: true,
    isDead: false,
  };
  return [TEST_UNIT_1, TEST_UNIT_2, TEST_UNIT_3];
};

/** Returns initial board state for game */
export const getInitialBoardState: () => Array<Array<SquareState>> = () => {
  return [
    [{ type: "unit", id: 3, unitType: "PEASANT" }, {}, {}, {}, {}, {}, {}, {}],
    [
      { type: "unit", id: 3, unitType: "PEASANT" },
      {},
      {},
      {},
      {},
      {},
      { type: "obstacle", id: 1, obstacleType: "STONES" },
      {},
    ],
    [
      { type: "unit", id: 1, unitType: "SWORDSMAN" },
      {},
      {},
      {},
      { type: "obstacle", id: 1, obstacleType: "STONES" },
      {},
      {},
      {},
    ],
    [{ type: "unit", id: 2, unitType: "PEASANT" }, {}, {}, {}, {}, {}, {}, {}],
    [
      { type: "unit", id: 3, unitType: "SWORDSMAN" },
      {},
      {},
      {},
      {},
      {},
      {},
      {},
    ],
  ];
};
