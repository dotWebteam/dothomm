import { FC, SetStateAction, Dispatch, useState } from "react";
import styled from "styled-components";
import Button from "../../../../../components/Button";
import Input from "../../../../../components/Input";
import { getUnitIconByName } from "../../../../gamePage/pictures/utils";
import {
  UnitTemplate,
  UnitTemplateWithCount,
} from "../../../../gamePage/types";

interface IUnit {
  unit: UnitTemplate;
  money: number;
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
  },
  unit,
  setMoney,
  setMyUnits,
  money,
}) => {
  const [unitsCount, setUnitsCount] = useState<number>(1);

  const handleClick = () => {
    if (unitsCount <= 0 || money - cost * unitsCount < 0) return null;
    setMoney((prevState) => prevState - cost * unitsCount);
    const addedUnit = { ...unit, count: unitsCount };
    setMyUnits((prevState) => [...prevState, addedUnit]);
  };

  return (
    <StyledUnitWrapper>
      <img src={getUnitIconByName(unitType)} />
      <StyledUnitName>{unitType}</StyledUnitName>
      <StyledCharachteristic>AP: {maxActionPoints}</StyledCharachteristic>
      <StyledCharachteristic>
        Atk:{" "}
        {minAttack === maxAttack ? minAttack : `${minAttack} - ${maxAttack}`}
      </StyledCharachteristic>
      <StyledCharachteristic>HP: {maxHealthPoints}</StyledCharachteristic>
      <StyledCharachteristic>Cost: {cost}</StyledCharachteristic>
      <Input
        type="range"
        value={unitsCount}
        onChange={(e) => setUnitsCount(Number(e.target.value))}
      />
      <Input
        type="number"
        value={unitsCount}
        onChange={(e) => setUnitsCount(Number(e.target.value))}
      />
      <Button onClick={handleClick}>Buy</Button>
    </StyledUnitWrapper>
  );
};

const StyledImg = styled.img`
  max-height: 100px;
`;

const StyledUnitWrapper = styled.div`
  width: 100px;
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
