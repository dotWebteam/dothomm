import { FC } from "react";
import { capitalize } from "lodash";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store/store";

const UnitInfoSidebar: FC = () => {
  const activeUnit = useSelector((state: RootState) => state.game.activeUnit);
  return (
    <div>
      <div>Unit name: {capitalize(activeUnit.unitType)}</div>
      <div>
        Unit's attack: {activeUnit.attack.min} - {activeUnit.attack.max}
      </div>
      <div>Unit's action points: {activeUnit.actionPoints.current}</div>
      <div>Unit's count: {activeUnit.count}</div>
      <div>Owner: {activeUnit.owner}</div>
    </div>
  );
};

export default UnitInfoSidebar;
