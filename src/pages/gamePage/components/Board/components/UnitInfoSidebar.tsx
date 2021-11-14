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
  const spellPoints = useSelector((state: RootState) => state.game.spellPoints);

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
        <StyledInfoSection>
          <div>{capitalize(activePlayer)}</div>
          <ManaBar>
            <StyledManaTitle>
              {spellPoints.current}/{spellPoints.max}
            </StyledManaTitle>
            <BlackLine
              value={{ current: spellPoints.current, max: spellPoints.max }}
            />
          </ManaBar>
        </StyledInfoSection>
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

const StyledInfoSection = styled.div`
  margin-left: 20px;
  width: 120px;
`;

const StyledPlayerInfo = styled.div`
  padding: 0 20px;
  display: flex;
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

const ManaBar = styled.div`
  border: 2px solid #ffe98c;
  background: rgb(7, 147, 195);
  background: radial-gradient(
    circle,
    rgba(7, 147, 195, 1) 0%,
    rgba(11, 5, 89, 1) 100%
  );
  margin-top: 5px;
  align-items: center;
  justify-content: center;
  height: 20px;
  width: 140px;
`;

const BlackLine = styled.div<{ value: { current: number; max: number } }>`
  height: 20px;
  background: black;
  float: right;
  width: ${({ value }) =>
    140 - Math.round((value.current * 140) / value.max)}px;
`;

const StyledManaTitle = styled.div`
  z-index: 2;
  position: absolute;
  margin-top: 3px;
  margin-left: 56px;
`;

export default InfoSidebar;
