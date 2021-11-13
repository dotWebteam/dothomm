import { Spell } from "../pages/gamePage/types";

import magicArrowIcon from "../pages/gamePage/pictures/spellbook/spellsIcons/magicArrowIcon.png";

export const MAGIC_ARROW: Spell = {
  id: 1,
  name: "Magic Arrow",
  iconSrc: magicArrowIcon,
  cost: 2,
};

const LIST_OF_SPELLS = [MAGIC_ARROW];

export default LIST_OF_SPELLS;
