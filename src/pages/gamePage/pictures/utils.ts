import PeasantIcon from "./Peasant.png";
import HeroIcon from "./Hero.png";
import { UnitType } from "../types";

/** Return sprite src by its name */
export const getUnitSpriteByName = (unitname: UnitType) => {
  switch (unitname) {
    case "HERO":
      return HeroIcon;
    case "PEASANT":
      return PeasantIcon;
  }
};
