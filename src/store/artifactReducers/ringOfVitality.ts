import { BoardState } from "../../pages/gamePage/types";

export const ringOfVitalityReducer = (board: BoardState, owner: string) => {
  board.units = board.units.map((unit) => {
    if (owner === unit.owner) {
      return {
        ...unit,
        healthPoints: {
          max: unit.healthPoints.max + 1,
          current: unit.healthPoints.max + 1,
        },
      };
    }
    return unit;
  });
  return board;
};
