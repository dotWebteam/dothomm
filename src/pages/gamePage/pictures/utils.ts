// units
import PeasantIcon from "./units/Peasant.png";
import SwordsmanIcon from "./units/Swordsman.png";

// dead bodies
import SwordsmanDeadBodyIcon from "./obstacles/deadBodies/SwordsmanDeadBody.png";
import PeasantDeadBodyIcon from "./obstacles/deadBodies/PeasantDeadBody.png";

// obstacles
import StonesIcon from "./obstacles/Stones.png";

import { UnitType, ObstacleType } from "../types";

/** Return unit sprite src by its name */
export const getUnitSpriteByName = (unitname: UnitType) => {
  switch (unitname) {
    case "SWORDSMAN":
      return SwordsmanIcon;
    case "PEASANT":
      return PeasantIcon;
  }
};

/** Return obstacle sprite src by its name */
export const getObstacleSpriteByName = (obstacleName: ObstacleType) => {
  if (obstacleName.startsWith("DEAD_BODY"))
    return getDeadBodySpriteByName(obstacleName);
  switch (obstacleName) {
    case "STONES":
      return StonesIcon;
  }
};

/** Return dead body sprite src by its name */
export const getDeadBodySpriteByName = (deadBodyName: ObstacleType) => {
  switch (deadBodyName.replace("DEAD_BODY_", "")) {
    case "SWORDSMAN":
      return SwordsmanDeadBodyIcon;
    case "PEASANT":
      return PeasantDeadBodyIcon;
  }
};
