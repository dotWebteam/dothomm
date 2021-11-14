import { BoardAndUnitsState } from "../../../types";
import { applyMagicArrowEffect } from "./MagicArrow/reducer";

export const applySpellEffect = (BoardAndUnitsState: BoardAndUnitsState) => {
  const { spellName } = BoardAndUnitsState;
  switch (spellName) {
    case "Magic Arrow":
      return applyMagicArrowEffect(BoardAndUnitsState);
    default:
      return BoardAndUnitsState;
  }
};
