import { FC } from "react";
import styled from "styled-components";
import { getUnitSpriteByName } from "../../../pictures/utils";
import { UnitType } from "../../../types";

type IHealthPoints = { max: number; current: number };

interface IUnit {
  className?: string;
  unitType: UnitType;
  count?: number;
  healthPoints?: IHealthPoints;
  actionPoints?: number;
  viewDirection?: string;
}

const Unit: FC<IUnit> = ({
  className,
  unitType,
  healthPoints,
  actionPoints,
  count,
  viewDirection,
}) => {
  if (healthPoints) console.log(healthPoints.current);
  return (
    <StyledWrapper>
      <StyledImg
        lookLeft={viewDirection === "left"}
        className={className}
        src={getUnitSpriteByName(unitType)}
      />
      {healthPoints && (
        <HealthBar>
          <HealthLine value={healthPoints} />
        </HealthBar>
      )}
      <StyledArmyCountCounter>{count}</StyledArmyCountCounter>
      {/* <StyledCounters>
        {healthPoints && (
          <StyledHealthCounter>{healthPoints}</StyledHealthCounter>
        )}
        {actionPoints && (
          <StyledActionPointsCounter>{actionPoints}</StyledActionPointsCounter>
        )}
        {count && <StyledArmyCountCounter>{count}</StyledArmyCountCounter>}
      </StyledCounters> */}
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StyledImg = styled.img<{ lookLeft: boolean }>`
  ${({ lookLeft }) => lookLeft && "transform: scaleX(-1);"}
  max-height: 100px;
`;

const StyledArmyCountCounter = styled.div`
  background: rgb(144, 13, 163);
  background: radial-gradient(
    circle,
    rgba(144, 13, 163, 1) 0%,
    rgba(57, 9, 121, 1) 100%
  );
  min-width: 40px;
  display: flex;
  justify-content: center;
  border: 2px solid #ffe98c;
`;

const HealthBar = styled.div`
  border: 2px solid #ffe98c;
  border-bottom: none;
  margin-top: 5px;
  background: black;
  height: 4px;
  width: 40px;
`;

const HealthLine = styled.div<{ value: IHealthPoints }>`
  background: red;
  height: 4px;
  width: ${({ value }) => Math.round((value.current * 40) / value.max)}px;
`;

// const StyledHealthCounter = styled.div`
//   background-color: red;
//   min-width: 30px;
// `;

// const StyledActionPointsCounter = styled.div`
//   background-color: yellow;
//   min-width: 30px;
// `;

// const StyledArmyCountCounter = styled.div`
//   background-color: blue;
//   min-width: 30px;
// `;

// const StyledCounters = styled.div`
//   display: flex;
//   justify-content: center;
// `;

export default Unit;
