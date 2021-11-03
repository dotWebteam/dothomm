import { FC } from "react";
import styled from "styled-components";
import { capitalize } from "lodash";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store/store";
import { getUnitIconByName } from "../../pictures/utils";

const UnitInfoSidebar: FC = () => {
  const activeUnit = useSelector((state: RootState) => state.game.activeUnit);
  if (!activeUnit) return null;
  const {
    unitType,
    actionPoints: { current: currentActionPoints },
    attack: { max: maxAttack, min: minAttack },
    healthPoints: { max: maxHealthPoints },
    count: unitCount,
    owner: unitOwner,
  } = activeUnit;
  return (
    <StyledUnitInfoSidebar>
      <StyledImg src={getUnitIconByName(unitType)} />
      <div>Unit name: {capitalize(activeUnit.unitType)}</div>
      <div>
        Unit's attack: {minAttack} - {maxAttack}
      </div>
      <div>Unit's action points: {currentActionPoints}</div>
      <div>Unit's count: {unitCount}</div>
      <div>Owner: {unitOwner}</div>
    </StyledUnitInfoSidebar>
  );
};

const StyledImg = styled.img``;

const StyledUnitInfoSidebar = styled.div`
  width: 200px;
`;

export default UnitInfoSidebar;
