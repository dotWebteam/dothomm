import { Spell } from "../pages/gamePage/types";

import magicArrowIcon from "../pages/gamePage/pictures/spellbook/spellsIcons/magicArrowIcon.png";
import magicArrowEffect from "../pages/gamePage/pictures/spellbook/spellEffects/magicArrowEffect.png";

export const MAGIC_ARROW: Spell = {
  id: 1,
  name: "Magic Arrow",
  iconSrc: magicArrowIcon,
  effectSrc: magicArrowEffect,
  cost: 2,
};

const LIST_OF_SPELLS = [MAGIC_ARROW];

export default LIST_OF_SPELLS;
