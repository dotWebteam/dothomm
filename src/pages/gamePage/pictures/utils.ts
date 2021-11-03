// units
import PeasantIcon from "./units/Peasant.png";
import SwordsmanIcon from "./units/Swordsman.png";

// unit icons
import swordsmanSmallIcon from "./unitIcons/swordsman.png";
import peasantSmallIcon from "./unitIcons/peasant.png";

// dead bodies
import SwordsmanDeadBodyIcon from "./obstacles/deadBodies/SwordsmanDeadBody.png";
import PeasantDeadBodyIcon from "./obstacles/deadBodies/PeasantDeadBody.png";

// obstacles
import StonesIcon from "./obstacles/Stones.png";

// backgrounds
import BeachBackground from "./boardBackgrounds/CmBkBch.png";
import BoatBackground from "./boardBackgrounds/CmBkBoat.png";

import { UnitType, ObstacleType, BackgroundType } from "../types";

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

/** Return unit icon src by its name */
export const getUnitIconByName = (unitName: UnitType) => {
  switch (unitName) {
    case "SWORDSMAN":
      return swordsmanSmallIcon;
    case "PEASANT":
      return peasantSmallIcon;
  }
};

/** Return background picture src by its name */
export const getBackgroundPictureByName = (picName: BackgroundType) => {
  switch (picName) {
    case "BEACH":
      return BeachBackground;
    case "BOAT":
      return BoatBackground;
  }
};
