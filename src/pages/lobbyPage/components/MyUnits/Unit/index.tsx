import { FC, SetStateAction, Dispatch, useState } from "react";
import styled from "styled-components";
import Button from "../../../../../components/Button";
import { getUnitIconByName } from "../../../../gamePage/pictures/utils";
import { UnitTemplateWithCount } from "../../../../gamePage/types";

interface IUnit {
  unit: UnitTemplateWithCount;
  setMoney: Dispatch<SetStateAction<number>>;
  setMyUnits: Dispatch<SetStateAction<UnitTemplateWithCount[]>>;
}

const Unit: FC<IUnit> = ({
  unit: {
    unitType,
    actionPoints: { max: maxActionPoints },
    attack: { max: maxAttack, min: minAttack },
    healthPoints: { max: maxHealthPoints },
    cost,
    count,
  },
  unit,
  setMoney,
  setMyUnits,
}) => {
  const [unitsCount, setUnitsCount] = useState<number>(count);

  const handleClick = () => {
    setMoney((prevState) => prevState + cost * unitsCount);
    setMyUnits((prevState) => {
      let wasFound = false;
      return prevState.filter(({ count, unitType: currentUnitType }) => {
        if (count === unitsCount && unitType === currentUnitType && !wasFound) {
          wasFound = true;
          return false;
        }
        return true;
      });
    });
  };

  return (
    <StyledUnitWrapper>
      <StyledIconWrapper>
        <StyledImg src={getUnitIconByName(unitType)} />
        <StyledCount> {count}</StyledCount>
      </StyledIconWrapper>
      <Button onClick={handleClick}>Sell</Button>
    </StyledUnitWrapper>
  );
};

const StyledIconWrapper = styled.div`
  transform: scale(1);
`;

const StyledImg = styled.img`
  width: 100%;
`;

const StyledUnitWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 16px;
  border: 1px solid #ad8e42;
  :not(:last-child) {
    margin-right: 8px;
  }
`;

const StyledCount = styled.span`
  position: absolute;
  bottom: 3px;
  right: 5px;
  color: white;
`;

export default Unit;
