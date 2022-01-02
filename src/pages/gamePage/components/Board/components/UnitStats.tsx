import { FC } from "react";
import styled from "styled-components";
import { getUnitIconByName } from "../../../pictures/utils";
import { Unit, UnitTemplateWithCount } from "../../../types";

interface IUnitStats {
  unit: Unit | UnitTemplateWithCount;
  className?: string;
}

const UnitStats: FC<IUnitStats> = ({ unit, className }) => {
  const shownAttack =
    unit.attack.min === unit.attack.max
      ? unit.attack.min * unit.count
      : `${unit.attack.min * unit.count}-${unit.attack.max * unit.count}`;
  const totalHealth =
    (unit.count - 1) * unit.healthPoints.max + unit.healthPoints.current;
  return (
    <StyledUnitStats className={className}>
      <StyledIconWrapper>
        <StyledImg src={getUnitIconByName(unit.unitType)} />
        <StyledCount>{unit.count}</StyledCount>
      </StyledIconWrapper>
      <StyledInfo>
        <StyledTitle>{unit.unitType}</StyledTitle>
        <StyledCharacteristicContainer>
          <StyledCharacteristicText>Total attack</StyledCharacteristicText>
          <StyledCharacteristicValue>{shownAttack}</StyledCharacteristicValue>
        </StyledCharacteristicContainer>
        <StyledCharacteristicContainer>
          <StyledCharacteristicText>Total health</StyledCharacteristicText>
          <StyledCharacteristicValue>{totalHealth}</StyledCharacteristicValue>
        </StyledCharacteristicContainer>
        <StyledCharacteristicContainer>
          <StyledCharacteristicText>Defense</StyledCharacteristicText>
          <StyledCharacteristicValue>{unit.defense}</StyledCharacteristicValue>
        </StyledCharacteristicContainer>
      </StyledInfo>
    </StyledUnitStats>
  );
};

const StyledUnitStats = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
`;

const StyledImg = styled.img`
  border: 1px solid #ffe98c;
`;

const StyledCount = styled.span`
  position: absolute;
  bottom: 3px;
  right: 5px;
  color: white;
`;

const StyledIconWrapper = styled.div`
  height: 68px;
  position: relative;
`;

const StyledInfo = styled.div`
  margin-left: 8px;
`;

const StyledTitle = styled.div`
  display: flex;
  justify-content: center;
  width: 200px;
  padding: 5px 10px;
  border: 1px solid #ffe98c;
  background: rgb(157, 11, 11);
  background: radial-gradient(
    circle,
    rgba(157, 11, 11, 1) 0%,
    rgba(50, 3, 3, 1) 100%
  );
`;

const StyledCharacteristicContainer = styled.div`
  display: flex;
  justify-content: space-between;
  border: 1px solid #ffe98c;
  background-color: #000000a3;
`;

const StyledCharacteristicText = styled.div`
  padding: 2px 4px;
`;

const StyledCharacteristicValue = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 80px;
  padding: 2px 4px;
  border-left: 1px solid #ffe98c;
`;

export default UnitStats;
