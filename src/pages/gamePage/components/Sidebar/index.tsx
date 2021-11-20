import { FC } from "react";
import styled from "styled-components";
import { capitalize } from "lodash";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store/store";
import {
  getHeroPortraitPictureByName,
  getUnitIconByName,
} from "../../pictures/utils";
import { PLAYERS } from "../../../../constants/players";
import UnitStats from "../Board/components/UnitStats";
import Inventory from "./components/Inventory";

const InfoSidebar: FC = () => {
  const activeUnit = useSelector((state: RootState) => state.game.activeUnit);
  const activePlayer = useSelector((state: RootState) => state.game.myName);
  const spellPoints = useSelector((state: RootState) => state.game.spellPoints);

  if (!activeUnit) return null;
  const { owner: unitOwner } = activeUnit;
  const portraitName = unitOwner === PLAYERS[0] ? "ORRIN" : "ADELAIDE";
  return (
    <StyledInfoSidebar>
      <StyledPlayerInfo>
        <StyledImg src={getHeroPortraitPictureByName(portraitName)} />
        <StyledInfoSection>
          <StyledPlayerName>{capitalize(activePlayer)}</StyledPlayerName>
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
      <Inventory />
      <div>
        <StyledActiveUnitTitle>Active Unit</StyledActiveUnitTitle>
        <StyledUnitStats unit={activeUnit} />
      </div>
    </StyledInfoSidebar>
  );
};

const StyledPlayerName = styled.div`
  font-size: 20px;
`;

const StyledInfoSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 120px;
  padding: 10px;
`;

const StyledPlayerInfo = styled.div`
  margin: 0 0 0 20px;
  width: 290px;
  display: flex;
  border: 1px solid #ffe98c;
  background-color: #000000a3;
`;

const StyledInfoSidebar = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const StyledImg = styled.img`
  width: 60px;
  border: 1px solid #ffe98c;
`;

const StyledActiveUnitTitle = styled.div`
  margin: 0 0 8px 20px;
  display: flex;
  justify-content: center;
  padding: 5px 10px;
  border: 1px solid #ffe98c;
  background: rgb(15, 102, 10);
  background: radial-gradient(
    circle,
    rgba(15, 102, 10, 1) 0%,
    rgba(2, 34, 9, 1) 100%
  );
`;

const StyledUnitStats = styled(UnitStats)`
  margin-left: 20px;
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
  width: 205px;
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
  margin-left: 85px;
`;

export default InfoSidebar;
