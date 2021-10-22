import { FC } from "react";
import styled from "styled-components";
import { getUnitSpriteByName } from "../../../pictures/utils";
import { UnitType } from "../../../types";

interface IUnit {
  className?: string;
  unitType: UnitType;
  healthPoints?: number;
  actionPoints?: number;
}

const Unit: FC<IUnit> = ({
  className,
  unitType,
  healthPoints,
  actionPoints,
}) => {
  return (
    <StyledWrapper>
      <StyledImg className={className} src={getUnitSpriteByName(unitType)} />
      <StyledHealthCounter>{healthPoints}</StyledHealthCounter>
      <StyledActionPointsCounter>{actionPoints}</StyledActionPointsCounter>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
`;

const StyledImg = styled.img`
  width: 70px;
`;

const StyledHealthCounter = styled.div`
  background-color: red;
`;

const StyledActionPointsCounter = styled.div`
  background-color: yellow;
`;

export default Unit;
