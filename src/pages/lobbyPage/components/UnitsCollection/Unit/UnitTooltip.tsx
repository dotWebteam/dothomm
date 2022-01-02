import { FC } from "react";
import styled from "styled-components";
import { capitalize } from "lodash";
import { UnitTemplate } from "../../../../gamePage/types";

interface IUnitTooltip {
  unit: UnitTemplate;
}

const UnitTooltip: FC<IUnitTooltip> = ({ unit }) => {
  return (
    <StyledUnitInfo>
      <StyledTitle>{capitalize(unit?.unitType)}</StyledTitle>
      <StyledHorizontalLine />
      <StyledCharacteristic>
        Action points: {unit?.actionPoints.max}
      </StyledCharacteristic>
      <StyledCharacteristic>
        Attack: {unit?.attack.min}-{unit?.attack.max}
      </StyledCharacteristic>
      <StyledCharacteristic>
        Health: {unit?.healthPoints.max}
      </StyledCharacteristic>
      <StyledCharacteristic>Defense: {unit?.defense}</StyledCharacteristic>
      <StyledCharacteristic>Cost: {unit?.cost}</StyledCharacteristic>
    </StyledUnitInfo>
  );
};

const StyledTitle = styled.div``;

const StyledCharacteristic = styled.div``;

const StyledUnitInfo = styled.div`
  padding: 4px;
  background-color: #000000a6;
  width: 140px;
  border: 1px solid #ad8e42;
  margin-left: -4px;
`;

const StyledHorizontalLine = styled.hr`
  width: 100%;
  border: 1px solid;
  border-radius: 4px;
  box-shadow: 2px 2px 0 #000;
  margin-top: 4px;
  margin-bottom: 4px;
`;

export default UnitTooltip;
