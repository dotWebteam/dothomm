import { FC } from "react";
import styled from "styled-components";
import { capitalize } from "lodash";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../store/store";
import {
  getHeroPortraitPictureByName,
  getUnitIconByName,
} from "../../../pictures/utils";
import { PLAYERS } from "../../../../../constants/players";

const InfoSidebar: FC = () => {
  const activeUnit = useSelector((state: RootState) => state.game.activeUnit);
  const activePlayer = useSelector((state: RootState) => state.game.myName);
  if (!activeUnit) return null;
  const {
    unitType,
    actionPoints: { current: currentActionPoints },
    attack: { max: maxAttack, min: minAttack },
    count: unitCount,
    owner: unitOwner,
  } = activeUnit;
  const portraitName = unitOwner === PLAYERS[0] ? "ORRIN" : "ADELAIDE";
  return (
    <StyledInfoSidebar>
      <StyledPlayerInfo>
        <StyledImg src={getHeroPortraitPictureByName(portraitName)} />
        <div>{capitalize(activePlayer)}</div>
      </StyledPlayerInfo>
      <StyledUnitInfo>
        <StyledImg src={getUnitIconByName(unitType)} />
        <div>Unit name: {capitalize(activeUnit.unitType)}</div>
        <div>
          Unit attack: {minAttack} - {maxAttack}
        </div>
        <div>Unit action points: {currentActionPoints}</div>
        <div>Unit count: {unitCount}</div>
        <div>Owner: {unitOwner}</div>
      </StyledUnitInfo>
    </StyledInfoSidebar>
  );
};

const StyledPlayerInfo = styled.div`
  padding: 0 20px;
`;

const StyledInfoSidebar = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const StyledImg = styled.img`
  width: 80px;
`;

const StyledUnitInfo = styled.div`
  width: 200px;
  padding: 0 20px;
  display: flex;
  flex-direction: column;
`;

export default InfoSidebar;
