import { BoardState } from "../../pages/gamePage/types";

export const shieldOfDwarwenLordsReducer = (
  board: BoardState,
  owner: string
) => {
  board.units = board.units.map((unit) => {
    if (owner === unit.owner) {
      return {
        ...unit,
        defense: unit.defense + 1,
      };
    }
    return unit;
  });
  return board;
};
