import { SquareState, Unit } from "../../../types";

/** Returns initial units state for game */
export const getInitialUnitsState: () => Unit[] = () => {
  const TEST_UNIT_1 = {
    id: 1,
    name: "hero",
    coordinates: { x: 0, y: 2 },
    attack: 2,
    healthPoints: {
      max: 5,
      current: 5,
    },
    actionPoints: {
      max: 2,
      current: 2,
    },
    isActive: true,
    isOwner: true,
    isDead: false,
  };

  const TEST_UNIT_2 = {
    id: 2,
    name: "player 2",
    coordinates: { x: 0, y: 3 },
    attack: 2,
    healthPoints: {
      max: 5,
      current: 5,
    },
    actionPoints: {
      max: 1,
      current: 1,
    },
    isActive: true,
    isOwner: true,
    isDead: false,
  };

  const TEST_UNIT_3 = {
    id: 3,
    name: "player 3",
    coordinates: { x: 0, y: 4 },
    attack: 2,
    healthPoints: {
      max: 5,
      current: 5,
    },
    actionPoints: {
      max: 2,
      current: 2,
    },
    isActive: true,
    isOwner: false,
    isDead: false,
  };
  return [TEST_UNIT_1, TEST_UNIT_2, TEST_UNIT_3];
};

/** Returns initial board state for game */
export const getInitialBoardState: () => Array<Array<SquareState>> = () => {
  return [
    [{}, {}, {}, {}, {}, {}, {}, {}],
    [{}, {}, {}, {}, {}, {}, { type: "obstacle", id: 1 }, {}],
    [{ type: "unit", id: 1, unitType: "HERO" }, {}, {}, {}, {}, {}, {}, {}],
    [{ type: "unit", id: 2, unitType: "PEASANT" }, {}, {}, {}, {}, {}, {}, {}],
    [{ type: "unit", id: 3, unitType: "HERO" }, {}, {}, {}, {}, {}, {}, {}],
  ];
};
