import { SquareState } from "../../types";

export const NUMBERS_OF_BOARD_ROWS = 5;
export const NUMBERS_OF_BOARD_COLUMNS = 8;

export const INITIAL_BOARD_STATE: Array<Array<SquareState>> = [
  [{}, {}, {}, {}, {}, {}, {}, {}],
  [{}, {}, {}, {}, {}, {}, { type: "obstacle", id: 1 }, {}],
  [{ type: "unit", id: 1, unitType: "SWORDSMAN" }, {}, {}, {}, {}, {}, {}, {}],
  [{ type: "unit", id: 2, unitType: "PEASANT" }, {}, {}, {}, {}, {}, {}, {}],
  [{ type: "unit", id: 3, unitType: "SWORDSMAN" }, {}, {}, {}, {}, {}, {}, {}],
];

export const TEST_UNIT_1 = {
  id: 1,
  name: "hero",
  coordinates: { x: 0, y: 2 },
  actionPoints: {
    max: 2,
    current: 2,
  },
  isActive: true,
  owner: "admin",
  isOwner: true,
  isDead: false,
};

export const TEST_UNIT_2 = {
  id: 2,
  name: "player 2",
  coordinates: { x: 0, y: 3 },
  actionPoints: {
    max: 1,
    current: 1,
  },
  isActive: true,
  owner: "admin",
  isOwner: true,
  isDead: false,
};

export const TEST_UNIT_3 = {
  id: 3,
  name: "player 3",
  coordinates: { x: 0, y: 4 },
  actionPoints: {
    max: 2,
    current: 2,
  },
  isActive: true,
  owner: "admin",
  isOwner: true,
  isDead: false,
};

export const INITIAL_UNITS_STATE = [TEST_UNIT_1, TEST_UNIT_2, TEST_UNIT_3];

export const ADJACENT_COORDINATES = [
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [0, -1],
  [0, 1],
  [1, -1],
  [1, 0],
  [1, 1],
];
