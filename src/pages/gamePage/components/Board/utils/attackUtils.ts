import { random } from "lodash";
import { SquareState, Unit, UnitType } from "../../../types";

/** Returns boolean whether unit is dead or not */
export const isUnitDead = (unit: Unit) => {
  return unit.count <= 0;
};

/** Returns squareState object to show on board after unit died */
export const getDeadBody: (id: number, unitType: UnitType) => SquareState = (
  id: number,
  unitType: UnitType
) => {
  return { type: "deadBody", id: id, deadBodyType: `DEAD_BODY_${unitType}` };
};

/** Returns an object with units killed number and current unit health TODO: look in magicArrowEffect func for damage and remake this*/
export const getHowManyUnitsDied = (attacker: Unit, defender: Unit) => {
  const totalDamagePoints =
    random(attacker.attack.min, attacker.attack.max) * attacker.count;

  const currentUnitHealthPoints =
    defender.healthPoints.current - totalDamagePoints;

  if (currentUnitHealthPoints > 0)
    return { unitsKilled: 0, currentUnitHealthPoints };

  const remainingDamagePoints =
    totalDamagePoints - defender.healthPoints.current;

  const unitsKilled =
    Math.round(remainingDamagePoints / defender.healthPoints.max) + 1;

  const excessDamage = Math.round(
    remainingDamagePoints % defender.healthPoints.max
  );

  return {
    unitsKilled,
    currentUnitHealthPoints: defender.healthPoints.max - excessDamage,
  };
};
