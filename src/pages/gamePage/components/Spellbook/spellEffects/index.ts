import { BoardAndUnitsState } from "../../../types";
import { applyMagicArrowEffect } from "./MagicArrow/reducer";

export const applySpellEffect = (BoardAndUnitsState: BoardAndUnitsState) => {
  const { spellName, board, units, deadUnits, lastAction, target } =
    BoardAndUnitsState;
  switch (spellName) {
    case "Magic Arrow":
      return applyMagicArrowEffect(BoardAndUnitsState);
    default:
      return BoardAndUnitsState;
  }
};
