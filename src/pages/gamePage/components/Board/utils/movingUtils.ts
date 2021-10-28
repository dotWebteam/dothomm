import { uniqWith } from "lodash";
import Unit from "../components/Unit";

import {
  NUMBERS_OF_BOARD_ROWS,
  NUMBERS_OF_BOARD_COLUMNS,
  ADJACENT_COORDINATES,
} from "../constants/boardConstants";
export const MoraleChange=(arr:Array<typeof Unit>):Array<typeof Unit> =>{
  for(let i = 0;i<arr.length;i++) { 
    arr[i].Tier*arr[i].count;
 }
  return arr;
};
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
//добавить обработку по диагонали
};
//nihuya ne ponyal no och intersno 
/** Get adjacent squares coordinates considering available action points*/
export const getAdjacentSquaresCoordinatesWithActionPoints = (
  x: number,
  y: number,
  actionPoints: number,
  arrOfAdjCoordinates: Array<Array<number>> = []
) => {
  if (actionPoints <= 0.5) {
    return arrOfAdjCoordinates;
  }
  getAdjacentSquaresCoordinates(x, y).forEach(([adjX, adjY]) => {
    arrOfAdjCoordinates.push([adjX, adjY]);

    getAdjacentSquaresCoordinatesWithActionPoints(
      adjX,
      adjY,
      actionPoints - getHowManyActionPointsToMove(x,y,adjX,adjY), //искренне надеюсь что здесь обработка движений
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
  //диагональ =1,5 хода
  return (Math.min(xDiff,  yDiff)*1.5+(Math.max(xDiff,yDiff)-Math.min(xDiff , yDiff)));
};

