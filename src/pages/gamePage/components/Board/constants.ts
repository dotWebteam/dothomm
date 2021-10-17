export const NUMBERS_OF_BOARD_ROWS = 5;
export const NUMBERS_OF_BOARD_COLUMNS = 8;

export const INITIAL_BOARD_STATE = [
  [{ unitName: "Player" }, {}, {}, {}, {}, {}, {}, {}],
  [{}, {}, {}, {}, {}, {}, {}, {}],
  [{}, {}, {}, {}, {}, {}, {}, {}],
  [{}, {}, {}, {}, {}, {}, {}, {}],
  [{}, {}, {}, {}, {}, {}, {}, {}],
];

export const TEST_UNIT = {
  name: "player",
  coordinates: { x: 0, y: 1 },
  actionPoints: {
    max: 2,
    current: 2,
  },
};

export const INITIAL_UNITS_STATE = [TEST_UNIT];

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
