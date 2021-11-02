import { random, shuffle } from "lodash";

import { SquareState, Unit, UnitTemplateWithCount } from "../../../types";
import {
  NUMBERS_OF_BOARD_ROWS,
  NUMBERS_OF_BOARD_COLUMNS,
  FIRST_PLAYER_POSSIBLE_INITIAL_COORDINATES,
  SECOND_PLAYER_POSSIBLE_INITIAL_COORDINATES,
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

/** Returns initial board and units synchronized state for game */

export const getInitialBoardAndUnitsState = (
  firstPlayerUnitTemplates: Array<UnitTemplateWithCount>,
  secondPlayerUnitTemplates: Array<UnitTemplateWithCount>,
  firstPlayer: string,
  secondPlayer: string
) => {
  // Setting the owners and unique indexes
  const firstPlayerUnits = firstPlayerUnitTemplates.map(
    (UnitTemplate, index) => {
      return { ...UnitTemplate, owner: firstPlayer, id: index };
    }
  );
  const offset = firstPlayerUnitTemplates.length;
  const secondPlayerUnits = secondPlayerUnitTemplates.map(
    (UnitTemplate, index) => {
      return { ...UnitTemplate, owner: secondPlayer, id: offset + index };
    }
  );

  // Setting coordinates by random (TODO: set coordinates manually by players)
  let firstPlayerPossibleInitialCoordinates = shuffle(
    FIRST_PLAYER_POSSIBLE_INITIAL_COORDINATES
  );

  const firstPlayerUnitsWithCoordinates = firstPlayerUnits.map((unit) => {
    const coordinates = firstPlayerPossibleInitialCoordinates.pop();
    if (!coordinates)
      throw new Error(
        "The number of available coordinates for the first player is less than the number of its units!"
      );
    return {
      ...unit,
      coordinates: coordinates,
    };
  });

  let secondPlayerPossibleInitialCoordinates = shuffle(
    SECOND_PLAYER_POSSIBLE_INITIAL_COORDINATES
  );

  const secondPlayerUnitsWithCoordinates = secondPlayerUnits.map((unit) => {
    const coordinates = secondPlayerPossibleInitialCoordinates.pop();
    if (!coordinates)
      throw new Error(
        "The number of available coordinates for the second player is less than the number of its units!"
      );
    return {
      ...unit,
      coordinates: coordinates,
    };
  });

  // Sorting units by actionPoints and adding isActive flag
  const unitsArray = firstPlayerUnitsWithCoordinates
    .concat(secondPlayerUnitsWithCoordinates)
    .sort(
      (firstEl, secondEl) =>
        firstEl.actionPoints.max - secondEl.actionPoints.max
    )
    .map((unit, index) =>
      index === 0 ? { ...unit, isActive: true } : { ...unit, isActive: false }
    );

  // Setting initial units on board state
  let board = [
    [{}, {}, {}, {}, {}, {}, {}, {}],
    [{}, {}, {}, {}, {}, {}, {}, {}],
    [{}, {}, {}, {}, {}, {}, {}, {}],
    [{}, {}, {}, {}, {}, {}, {}, {}],
    [{}, {}, {}, {}, {}, {}, {}, {}],
  ];
  unitsArray.forEach(({ coordinates: { x, y }, unitType, id }) => {
    board[y][x] = { type: "unit", unitType, id };
  });

  // Add random obstacles to board
  board.forEach((row) =>
    row.forEach((square) => {
      square = Boolean(random())
        ? { type: "obstacle", id: 1, obstacleType: "STONES" }
        : {};
    })
  );

  return { units: unitsArray, board: board, activeUnit: unitsArray[0] };
};
