import { FC } from "react";
import styled from "styled-components";
import { getUnitSpriteByName } from "../../../pictures/utils";
import { UnitType } from "../../../types";

interface IUnit {
  className?: string;
  unitType: UnitType;
}

const Unit: FC<IUnit> = ({ className, unitType }) => {
  return (
    <StyledImg className={className} src={getUnitSpriteByName(unitType)} />
  );
};

const StyledImg = styled.img`
  width: 70px;
  position: absolute;
`;

export default Unit;
