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
      <StyledCounters>
        {healthPoints && (
          <StyledHealthCounter>{healthPoints}</StyledHealthCounter>
        )}
        {actionPoints && (
          <StyledActionPointsCounter>{actionPoints}</StyledActionPointsCounter>
        )}
      </StyledCounters>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StyledImg = styled.img`
  max-height: 100px;
`;

const StyledHealthCounter = styled.div`
  background-color: red;
  min-width: 30px;
`;

const StyledActionPointsCounter = styled.div`
  background-color: yellow;
  min-width: 30px;
`;

const StyledCounters = styled.div`
  display: flex;
  justify-content: center;
`;

export default Unit;
