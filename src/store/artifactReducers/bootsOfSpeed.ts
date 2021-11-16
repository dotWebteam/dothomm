import { BoardState } from "../../pages/gamePage/types";

export const bootsOfSpeedReducer = (board: BoardState, owner: string) => {
  board.units = board.units.map((unit) => {
    if (owner === unit.owner) {
      return {
        ...unit,
        actionPoints: {
          max: unit.actionPoints.max + 1,
          current: unit.actionPoints.max + 1,
        },
      };
    }
    return unit;
  });
  return board;
};
