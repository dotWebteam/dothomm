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
import BeachBackground from "./boardBackgrounds/BEACH.png";
import BoatBackground from "./boardBackgrounds/BOAT.png";
import CleverFieldBackground from "./boardBackgrounds/CLEVER_FIELD.png";
import DesertBackground from "./boardBackgrounds/DESERT.png";
import GreenMountainsBackground from "./boardBackgrounds/GREEN_MOUNTAINS.png";
import GreenTreesBackground from "./boardBackgrounds/GREEN_TREES.png";
import LavaBackground from "./boardBackgrounds/LAVA.png";
import SwampBackground from "./boardBackgrounds/SWAMP.png";
import WastelandBackground from "./boardBackgrounds/WASTELAND.png";

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

// TODO: STORE IMAGE SOURCES IN LISTS!!!
/** Return background picture src by its name */
export const getBackgroundPictureByName = (picName: BackgroundType) => {
  switch (picName) {
    case "BEACH":
      return BeachBackground;
    case "BOAT":
      return BoatBackground;
    case "CLEVER_FIELD":
      return CleverFieldBackground;
    case "DESERT":
      return DesertBackground;
    case "GREEN_MOUNTAINS":
      return GreenMountainsBackground;
    case "GREEN_TREES":
      return GreenTreesBackground;
    case "LAVA":
      return LavaBackground;
    case "SWAMP":
      return SwampBackground;
    case "WASTELAND":
      return WastelandBackground;
  }
};

/** Get list of background pictures src */
export const getBackgroundsList = () => {
  return [
    { name: "BEACH", src: BeachBackground },
    { name: "BOAT", src: BoatBackground },
    { name: "CLEVER_FIELD", src: CleverFieldBackground },
    { name: "DESERT", src: DesertBackground },
    { name: "GREEN_MOUNTAINS", src: GreenMountainsBackground },
    { name: "GREEN_TREES", src: GreenTreesBackground },
    { name: "LAVA", src: LavaBackground },
    { name: "SWAMP", src: SwampBackground },
    { name: "WASTELAND", src: WastelandBackground },
  ];
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
