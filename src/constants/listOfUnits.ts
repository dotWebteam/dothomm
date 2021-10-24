import { UnitTemplate } from "../pages/gamePage/types";

export const SWORDSMAN: UnitTemplate = {
  unitType: "SWORDSMAN",
  attack: {
    min: 6,
    max: 9,
  },
  healthPoints: {
    max: 35,
    current: 35,
  },
  actionPoints: { max: 5, current: 5 },
  cost: 300,
  isDead: false,
};

export const PEASANT: UnitTemplate = {
  unitType: "PEASANT",
  attack: {
    min: 1,
    max: 1,
  },
  healthPoints: {
    max: 1,
    current: 1,
  },
  actionPoints: { max: 3, current: 3 },
  cost: 10,
  isDead: false,
};

const LIST_OF_UNITS = [SWORDSMAN, PEASANT];

export default LIST_OF_UNITS;