import { FC, SetStateAction, Dispatch, useState } from "react";
import styled from "styled-components";
import Button from "../../../../../components/Button";
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
    // setMoney((prevState) => prevState + cost * unitsCount);
    // setMyUnits((prevState) => prevState.map((unit) => unit.filter));
  };

  return (
    <StyledUnitWrapper>
      <StyledUnitName>Name: {unitType}</StyledUnitName>
      <StyledCharachteristic>
        Max action points for turn: {maxActionPoints}
      </StyledCharachteristic>
      <StyledCharachteristic>
        Attack:{" "}
        {minAttack === maxAttack ? minAttack : `${minAttack} - ${maxAttack}`}
      </StyledCharachteristic>
      <StyledCharachteristic>
        Health points per 1 unit: {maxHealthPoints}
      </StyledCharachteristic>
      <StyledCharachteristic>Cost per 1 unit: {cost}</StyledCharachteristic>
      <StyledCharachteristic>
        Total cost: {cost * unitsCount}
      </StyledCharachteristic>
      <StyledCharachteristic>Total amount: {count}</StyledCharachteristic>
      <Button onClick={handleClick} disabled>
        Sell
      </Button>
    </StyledUnitWrapper>
  );
};

const StyledImg = styled.img`
  max-height: 100px;
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

const StyledUnitName = styled.span``;

const StyledCharachteristic = styled.span``;

export default Unit;
