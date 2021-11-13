import { BoardAndUnitsState } from "../../../types";
import { applyMagicArrowEffect } from "./magicArrowEffect";

export const applySpellEffect = (BoardAndUnitsState: BoardAndUnitsState) => {
  const { spellName, board, units, deadUnits, lastAction, target } =
    BoardAndUnitsState;
  console.log("spellName ", spellName);
  switch (spellName) {
    case "Magic Arrow":
      return applyMagicArrowEffect(BoardAndUnitsState);
    default:
      return BoardAndUnitsState;
  }
};
