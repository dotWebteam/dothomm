import { FC, SetStateAction, Dispatch, useState } from "react";
import styled from "styled-components";
import Button from "../../../../../components/Button";
import Input from "../../../../../components/Input";
import { getUnitIconByName } from "../../../../gamePage/pictures/utils";
import {
  UnitTemplate,
  UnitTemplateWithCount,
} from "../../../../gamePage/types";

import goldIcon from "../../../../../pictures/gold.png";

interface IUnit {
  unit: UnitTemplate;
  money: number;
  setMoney: Dispatch<SetStateAction<number>>;
  setMyUnits: Dispatch<SetStateAction<UnitTemplateWithCount[]>>;
  totalUnits: UnitTemplate[];
}

const Unit: FC<IUnit> = ({
  unit: {
    unitType,
    actionPoints: { max: maxActionPoints },
    attack: { max: maxAttack, min: minAttack },
    defense,
    healthPoints: { max: maxHealthPoints },
    cost,
  },
  unit,
  setMoney,
  setMyUnits,
  money,
  totalUnits,
}) => {
  const [unitsCount, setUnitsCount] = useState<number>(1);

  const handleClick = () => {
    if (
      unitsCount <= 0 ||
      money - cost * unitsCount < 0 ||
      totalUnits?.length >= 5
    )
      return null;
    setMoney((prevState) => prevState - cost * unitsCount);
    const addedUnit = { ...unit, count: unitsCount };
    setMyUnits((prevState) => [...prevState, addedUnit]);
  };

  return (
    <StyledUnitWrapper>
      <StyledCharactericticsSection>
        <StyledImg src={getUnitIconByName(unitType)} />
        <StyledRow>
          <StyledUnitName>{unitType}</StyledUnitName>
          <StyledCharachteristic>AP: {maxActionPoints}</StyledCharachteristic>
          <StyledCharachteristic>
            Atk:{" "}
            {minAttack === maxAttack
              ? minAttack
              : `${minAttack} - ${maxAttack}`}
          </StyledCharachteristic>
          <StyledCharachteristic>
            HP: {maxHealthPoints} | Def: {defense}
          </StyledCharachteristic>
          <StyledCharachteristic>Cost: {cost}</StyledCharachteristic>
        </StyledRow>
      </StyledCharactericticsSection>
      <StyledInputSection>
        <StyledInputContainer>
          Count:
          <StyledInput
            type="number"
            min="0"
            value={unitsCount}
            onChange={(e) => setUnitsCount(Number(e.target.value))}
          />
        </StyledInputContainer>
        <StyledButton onClick={handleClick}>
          <img src={goldIcon} />
        </StyledButton>
      </StyledInputSection>
    </StyledUnitWrapper>
  );
};

const StyledImg = styled.img`
  margin-right: 16px;
  width: 70px;
  border: 1px solid #ad8e42;
`;

const StyledUnitWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex: 1;
  padding: 16px;
  border: 1px solid #ad8e42;
  :not(:last-child) {
    margin-bottom: 8px;
  }
`;

const StyledUnitName = styled.span``;

const StyledCharachteristic = styled.span``;

const StyledInputContainer = styled.div`
  display: flex;
  align-items: baseline;
`;

const StyledCharactericticsSection = styled.div`
  display: flex;
`;

const StyledButton = styled(Button)`
  padding: 5px;
`;

const StyledInput = styled(Input)`
  margin-left: 4px;
  padding: 5px;
  margin-bottom: 4px;
`;

const StyledRow = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 16px;
`;

const StyledInputSection = styled.div`
  display: flex;
  flex-direction: column;
`;

export default Unit;
