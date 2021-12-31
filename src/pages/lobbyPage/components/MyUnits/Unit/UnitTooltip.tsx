import { FC } from "react";
import styled from "styled-components";
import { capitalize } from "lodash";
import { UnitTemplateWithCount } from "../../../../gamePage/types";

interface IUnitTooltip {
  unit?: UnitTemplateWithCount;
}

const UnitTooltip: FC<IUnitTooltip> = ({ unit }) => {
  const shownAttack = `${Number(unit?.count) * Number(unit?.attack.min)}-${
    Number(unit?.count) * Number(unit?.attack.max)
  }`;
  const shownHealth = Number(unit?.count) * Number(unit?.healthPoints.max);
  const shownCost = Number(unit?.count) * Number(unit?.cost);

  return (
    <StyledUnitInfo>
      <StyledTitle>{capitalize(unit?.unitType)}</StyledTitle>
      <StyledHorizontalLine />
      <StyledCharacteristic>Total attack: {shownAttack}</StyledCharacteristic>
      <StyledCharacteristic>Total health: {shownHealth}</StyledCharacteristic>
      <StyledCharacteristic>Total cost: {shownCost}</StyledCharacteristic>
    </StyledUnitInfo>
  );
};

const StyledTitle = styled.div``;

const StyledCharacteristic = styled.div``;

const StyledUnitInfo = styled.div`
  padding: 4px;
  border-radius: 4px;
  background-color: #0000008f;
  width: 140px;
  border: 1px solid #ad8e42;
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
