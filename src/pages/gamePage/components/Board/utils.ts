import { uniqWith } from "lodash";

import {
  NUMBERS_OF_BOARD_ROWS,
  NUMBERS_OF_BOARD_COLUMNS,
  ADJACENT_COORDINATES,
} from "./constants";

/** Get adjacent squares coordinates */
export const getAdjacentSquaresCoordinates = (x: number, y: number) => {
  return ADJACENT_COORDINATES.map(([adjX, adjY]) =>
    0 <= x + adjX &&
    x + adjX < NUMBERS_OF_BOARD_COLUMNS &&
    0 <= y + adjY &&
    y + adjY < NUMBERS_OF_BOARD_ROWS
      ? [x + adjX, y + adjY]
      : []
  ).filter((el) => el.length > 0);
};

/** Get adjacent squares coordinates considering available action points*/
export const getAdjacentSquaresCoordinatesWithActionPoints = (
  x: number,
  y: number,
  actionPoints: number,
  arrOfAdjCoordinates: Array<Array<number>> = []
) => {
  if (actionPoints <= 0) {
    return arrOfAdjCoordinates;
  }
  getAdjacentSquaresCoordinates(x, y).forEach(([adjX, adjY]) => {
    arrOfAdjCoordinates.push([adjX, adjY]);

    getAdjacentSquaresCoordinatesWithActionPoints(
      adjX,
      adjY,
      actionPoints - 1,
      arrOfAdjCoordinates
    );
  });
  return uniqWith(
    arrOfAdjCoordinates,
    ([firstX, firstY], [secondX, secondY]) =>
      firstX === secondX && firstY === secondY
  );
};

/** Returns true if its available to move from one coordinate to another */
export const isAdjacentCoordinateWithActionPoints = (
  prevX: number,
  prevY: number,
  nextX: number,
  nextY: number,
  actionPoints: number
) => {
  return Boolean(
    getAdjacentSquaresCoordinatesWithActionPoints(
      prevX,
      prevY,
      actionPoints
    ).find(([x, y]) => nextX === x && nextY === y)
  );
};

/** Returns number of action points needed to get from one coordinate to another */
export const getHowManyActionPointsToMove = (
  prevX: number,
  prevY: number,
  nextX: number,
  nextY: number
) => {
  const xDiff = Math.abs(prevX - nextX);
  const yDiff = Math.abs(prevY - nextY);
  return Math.max(xDiff, yDiff);
};
