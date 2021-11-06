// units
import PeasantIcon from "./units/Peasant.png";
import SwordsmanIcon from "./units/Swordsman.png";
import PikemanIcon from "./units/Pikeman.png";

// unit icons
import swordsmanSmallIcon from "./unitIcons/swordsman.png";
import peasantSmallIcon from "./unitIcons/peasant.png";
import pikemanSmallIcon from "./unitIcons/pikeman.png";

// dead bodies
import SwordsmanDeadBodyIcon from "./obstacles/deadBodies/SwordsmanDeadBody.png";
import PeasantDeadBodyIcon from "./obstacles/deadBodies/PeasantDeadBody.png";
import PikemanDeadBodyIcon from "./obstacles/deadBodies/PikemanDeadBody.png";

// obstacles
import StonesIcon from "./obstacles/Stones.png";

// backgrounds
import BeachBackground from "./boardBackgrounds/CmBkBch.png";
import BoatBackground from "./boardBackgrounds/CmBkBoat.png";

// heroes portraits
import OrrinPortrait from "./heroes/portraits/Orrin.png";
import AdelaidePortrait from "./heroes/portraits/Adelaide.png";

import {
  UnitType,
  ObstacleType,
  BackgroundType,
  HeroType,
  DeadBodyType,
} from "../types";

/** Return unit sprite src by its name */
export const getUnitSpriteByName = (unitname: UnitType) => {
  switch (unitname) {
    case "SWORDSMAN":
      return SwordsmanIcon;
    case "PIKEMAN":
      return PikemanIcon;
    case "PEASANT":
      return PeasantIcon;
  }
};

/** Return obstacle sprite src by its name */
export const getObstacleSpriteByName = (obstacleName: ObstacleType) => {
  switch (obstacleName) {
    case "STONES":
      return StonesIcon;
  }
};

/** Return dead body sprite src by its name */
export const getDeadBodySpriteByName = (deadBodyName: DeadBodyType) => {
  switch (deadBodyName.replace("DEAD_BODY_", "")) {
    case "SWORDSMAN":
      return SwordsmanDeadBodyIcon;
    case "PIKEMAN":
      return PikemanDeadBodyIcon;
    case "PEASANT":
      return PeasantDeadBodyIcon;
  }
};

/** Return unit icon src by its name */
export const getUnitIconByName = (unitName: UnitType) => {
  switch (unitName) {
    case "SWORDSMAN":
      return swordsmanSmallIcon;
    case "PIKEMAN":
      return pikemanSmallIcon;
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

/** Return hero portrait picture src by its name */
export const getHeroPortraitPictureByName = (heroName: HeroType) => {
  switch (heroName) {
    case "ORRIN":
      return OrrinPortrait;
    case "ADELAIDE":
      return AdelaidePortrait;
  }
};
