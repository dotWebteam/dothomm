import { random, shuffle } from "lodash";

import { SquareState, Unit, UnitTemplateWithCount } from "../../../types";
import {
  NUMBERS_OF_BOARD_ROWS,
  NUMBERS_OF_BOARD_COLUMNS,
  FIRST_PLAYER_POSSIBLE_INITIAL_COORDINATES,
  SECOND_PLAYER_POSSIBLE_INITIAL_COORDINATES,
} from "../constants/boardConstants";

/** Setting the owners and unique indexes and directions of view */
const getUnitsForPlayersWithOwnerAndId = (
  firstPlayerUnitTemplates: UnitTemplateWithCount[],
  secondPlayerUnitTemplates: UnitTemplateWithCount[],
  firstPlayer: string,
  secondPlayer: string
) => {
  const firstPlayerUnits = firstPlayerUnitTemplates.map(
    (UnitTemplate, index) => {
      return {
        ...UnitTemplate,
        owner: firstPlayer,
        id: index,
        viewDirection: "right",
      };
    }
  );
  const offset = firstPlayerUnitTemplates.length;
  const secondPlayerUnits = secondPlayerUnitTemplates.map(
    (UnitTemplate, index) => {
      return {
        ...UnitTemplate,
        owner: secondPlayer,
        id: offset + index,
        viewDirection: "left",
      };
    }
  );
  return { firstPlayerUnits, secondPlayerUnits };
};

/** Setting coordinates by random (TODO: set coordinates manually by players) */
const getUnitsWithRandomCoordinates = (
  firstPlayerUnits: Omit<Unit, "coordinates" | "isActive">[],
  secondPlayerUnits: Omit<Unit, "coordinates" | "isActive">[]
) => {
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

  return { firstPlayerUnitsWithCoordinates, secondPlayerUnitsWithCoordinates };
};

/** Sorting units by actionPoints and adding isActive flag */
const getUnitsArrayFromTwoPlayersArraysWithCoordiates = (
  firstPlayerUnitsWithCoordinates: Omit<Unit, "isActive">[],
  secondPlayerUnitsWithCoordinates: Omit<Unit, "isActive">[]
) => {
  return firstPlayerUnitsWithCoordinates
    .concat(secondPlayerUnitsWithCoordinates)
    .sort(
      (firstEl, secondEl) =>
        firstEl.actionPoints.max - secondEl.actionPoints.max
    )
    .map((unit, index) =>
      index === 0 ? { ...unit, isActive: true } : { ...unit, isActive: false }
    );
};

/** Setting initial units on board state */
const getInitialBoardState = (unitsArray: Unit[]) => {
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
  return board;
};

/** Returns initial board and units synchronized state for game */
export const getInitialBoardAndUnitsState = (
  firstPlayerUnitTemplates: Array<UnitTemplateWithCount>,
  secondPlayerUnitTemplates: Array<UnitTemplateWithCount>,
  firstPlayer: string,
  secondPlayer: string
) => {
  // Setting the owners and unique indexes
  const { firstPlayerUnits, secondPlayerUnits } =
    getUnitsForPlayersWithOwnerAndId(
      firstPlayerUnitTemplates,
      secondPlayerUnitTemplates,
      firstPlayer,
      secondPlayer
    );

  // Setting coordinates by random (TODO: set coordinates manually by players)
  const { firstPlayerUnitsWithCoordinates, secondPlayerUnitsWithCoordinates } =
    getUnitsWithRandomCoordinates(firstPlayerUnits, secondPlayerUnits);

  // Sorting units by actionPoints and adding isActive flag
  const unitsArray = getUnitsArrayFromTwoPlayersArraysWithCoordiates(
    firstPlayerUnitsWithCoordinates,
    secondPlayerUnitsWithCoordinates
  );

  return {
    units: unitsArray,
    board: getInitialBoardState(unitsArray),
    activeUnit: unitsArray[0],
  };
};
