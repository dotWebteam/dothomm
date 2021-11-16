import { BoardAndUnitsState, Unit } from "../../../../types";
import { getDeadBody } from "../../../Board/utils/attackUtils";

const MAGIC_ARROW_DMG = 50;

// TODO: fix like attack reducer in board slice
const applyDirectDamageToUnits = (
  units: Unit[],
  targetX: number,
  targetY: number
) => {
  return units.map((unit) => {
    if (unit.coordinates.x === targetX && unit.coordinates.y === targetY) {
      const totalDamage = MAGIC_ARROW_DMG;
      const totalHpBeforeDmg =
        unit.healthPoints.max * (unit.count - 1) + unit.healthPoints.current;
      const totalHpAfterDmg = totalHpBeforeDmg - totalDamage;
      const unitCountAfterDmg = Math.ceil(
        totalHpAfterDmg / unit.healthPoints.max
      );
      const currentHealthAfterDmg = totalHpAfterDmg % unit.healthPoints.max;

      return {
        ...unit,
        healthPoints: {
          max: unit.healthPoints.max,
          current: currentHealthAfterDmg,
        },
        count: unitCountAfterDmg,
      };
    }
    return unit;
  });
};

export const applyMagicArrowEffect = (
  BoardAndUnitsState: BoardAndUnitsState
) => {
  const {
    board,
    deadUnits,
    units,
    target: { x: targetX, y: targetY },
  } = BoardAndUnitsState;
  const newUnits = applyDirectDamageToUnits(units, targetX, targetY);
  newUnits.forEach((unit) => {
    if (unit.count <= 0) {
      newUnits.splice(newUnits.indexOf(unit), 1);
      deadUnits?.push(unit);
      board[targetY][targetX] = getDeadBody(unit.id, unit.unitType);
    }
  });
  const newLastAction = `Magic arrow was casted in square ${targetX} ${targetY}`;
  return { board, units: newUnits, deadUnits, lastAction: newLastAction };
};
