import { SquareState, Unit, UnitType } from "../../../types";

/** Returns boolean whether unit is dead or not */
export const isUnitDead = (unit: Unit) => {
  return unit.healthPoints.current <= 0;
};

/** Returns squareState object to show on board after unit died */
export const getDeadBody: (id: number, unitType: UnitType) => SquareState = (
  id: number,
  unitType: UnitType
) => {
  return { type: "obstacle", id: id, obstacleType: `DEAD_BODY_${unitType}` };
};
