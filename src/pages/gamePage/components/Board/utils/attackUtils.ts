import { Unit } from "../../../types";

/** Returns boolean whether unit is dead or not */
export const isUnitDead = (unit: Unit) => {
  return unit.healthPoints.current <= 0;
};
