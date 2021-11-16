import { BoardState } from "../../pages/gamePage/types";

export const helmOfAlabasterUnicornReducer = (
  board: BoardState,
  owner: string
) => {
  board.myName === owner
    ? (board.spellPoints.max = board.spellPoints.current =
        board.spellPoints.max + 2)
    : (board.opponentSpellPoints.max = board.opponentSpellPoints.current =
        board.opponentSpellPoints.max + 2);
  return board;
};
