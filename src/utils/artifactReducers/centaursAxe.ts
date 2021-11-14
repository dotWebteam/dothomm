import { BoardState } from "../../pages/gamePage/types";

export const centaursAxeReducer = (board: BoardState, owner: string) => {
  board.units = board.units.map((unit) => {
    if (owner === unit.owner) {
      return {
        ...unit,
        attack: { max: unit.attack.max + 1, min: unit.attack.min },
      };
    }
    return unit;
  });
  return board;
};
