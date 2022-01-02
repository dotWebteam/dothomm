import { FC, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import Button from "../../../../../components/Button";
import Container from "../../../../../components/Container";

import Modal from "../../../../../components/Modal";
import Range from "../../../../../components/Range";
import UnitStats from "../../../../gamePage/components/Board/components/UnitStats";
import { UnitTemplate } from "../../../../gamePage/types";
import { addUnit } from "../../../lobbySlice";

import moneyIcon from "../../../../../pictures/money.png";

interface IBuyUnitModal {
  unit: UnitTemplate;
  money: number;
  onHide: () => void;
  totalUnits: UnitTemplate[];
}

const BuyUnitModal: FC<IBuyUnitModal> = ({
  onHide,
  unit,
  money,
  totalUnits,
}) => {
  const [unitCount, setUnitCount] = useState(1);

  const dispatch = useDispatch();

  const handleClick = () => {
    if (
      unitCount <= 0 ||
      money - unit.cost * unitCount < 0 ||
      totalUnits?.length >= 5
    )
      return null;
    const addedUnit = { ...unit, count: unitCount };

    dispatch(addUnit({ unit: addedUnit }));
    onHide();
  };

  const handleChange = (e: any) => {
    setUnitCount(e.target.value);
  };

  const maxAmountOfUnits = useMemo(() => Math.floor(money / unit.cost), [unit]);

  const handleMinClick = () => {
    setUnitCount(1);
  };

  const handleMinusOneClick = () => {
    if (unitCount <= 1) return null;
    setUnitCount(Number(unitCount - 1));
  };

  const handlePlusOneClick = () => {
    if (unitCount === maxAmountOfUnits) return null;
    setUnitCount(Number(unitCount + 1));
  };

  const handleMaxClick = () => {
    if (unitCount <= 1) return null;
    setUnitCount(Number(maxAmountOfUnits));
  };

  return (
    <Modal onOutsideClick={onHide}>
      <Container>
        <UnitStats unit={{ ...unit, count: unitCount }} />
        <StyledCostsContainer>
          <StyledCostContainer>
            <StyledMoneyIcon src={moneyIcon} />
            <div>Cost per troop: {unit.cost}</div>
          </StyledCostContainer>
          <StyledCostContainer>
            <StyledMoneyIcon src={moneyIcon} />
            <div>Total cost: {unit.cost * unitCount}</div>
          </StyledCostContainer>
        </StyledCostsContainer>
        <StyledRangeContainer>
          <StyledButton onClick={handleMinClick}>◀◀</StyledButton>
          <StyledButton onClick={handleMinusOneClick}>◀</StyledButton>
          <Range
            onChange={handleChange}
            value={unitCount}
            min={1}
            max={maxAmountOfUnits}
          />
          <StyledButton onClick={handlePlusOneClick}>▶</StyledButton>
          <StyledButton onClick={handleMaxClick}>▶▶</StyledButton>
        </StyledRangeContainer>

        <Button isOk onClick={handleClick} />
      </Container>
    </Modal>
  );
};

const StyledMoneyIcon = styled.img``;

const StyledCostsContainer = styled.div`
  margin-top: 8px;
  display: flex;
  width: 100%;
  gap: 8px;
`;

const StyledCostContainer = styled.div`
  border: 2px solid #ad8e42;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: #00000040;
`;

const StyledButton = styled(Button)`
  font-size: 14px;
  padding: 5px 10px;
`;

const StyledRangeContainer = styled.div`
  display: flex;
  width: 100%;
  margin: 8px 0px;
`;

export default BuyUnitModal;
