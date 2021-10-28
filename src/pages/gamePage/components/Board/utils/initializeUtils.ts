import { SquareState, Unit } from "../../../types";
import {
  NUMBERS_OF_BOARD_ROWS,
  NUMBERS_OF_BOARD_COLUMNS,
} from "../constants/boardConstants";

/** Returns initial units state for game */
export const getInitialUnitsState: () => Unit[] = () => {
  const TEST_UNIT_1: Unit = {
    id: 1,
    Tier: 1,
    UnitSpecie: "HUMAN",
    unitType: "PEASANT",
    coordinates: { x: 0, y: 2 },
    attack: {
      attackPower: 4,
      min: 1,
      max: 2,
    },
    healthPoints: {
      max: 2,
      current: 1,
      defense: 1,
    },
    criticalDmg: {
      percent: 1.25,
      chance: 0.1,
    },
    morale: {
      morale: 0.5,
      BattleBalance: 1,
      friendlyTroops: 0,
      nonFriendlyTroops: 0,
    },
    actionPoints: { max: 3, current: 3 },
    isActive: false,
    isDead: false,
    count: 1,
    owner: 1
  };

  const TEST_UNIT_2: Unit = {
    id: 2,
    Tier:1,
    UnitSpecie:"HUMAN",
    unitType: "PEASANT",
    coordinates: { x: 0, y: 2 },
    attack: {
      attackPower:4,
      min: 1,
      max: 2,
    },
    healthPoints: {
      max: 2,
      current: 1,
      defense:1,
    },
    criticalDmg:{
      percent:1.25,
      chance:0.1,
    },
    morale:{
      morale:0.5,
      BattleBalance:1,
      friendlyTroops:0,
      nonFriendlyTroops:0,
    },
    actionPoints: { max: 3, current: 3 },
    isActive: false,
    isDead: false,
    count: 1,
    owner: 1
  };

  const TEST_UNIT_3: Unit = {
    id: 3,
    Tier: 3,
    UnitSpecie: "HUMAN",
    unitType: "SWORDSMAN",
    attack: {
      attackPower: 9,
      min: 7,
      max: 9,
    },
    healthPoints: {
      max: 35,
      current: 35,
      defense: 15,
    },
    criticalDmg: {
      percent: 1.5,
      chance: 0.25,
    },
    morale: {
      morale: 0.5,
      BattleBalance: 1,
      friendlyTroops: 0,
      nonFriendlyTroops: 0,
    },
    actionPoints: { max: 4, current: 4 },
    isActive: true,
    isDead: false,
    coordinates: {
      x: 0,
      y: 0
    },
    count: 2,
    owner: 1
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
