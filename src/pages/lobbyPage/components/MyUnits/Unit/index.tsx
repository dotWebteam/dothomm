import { useSpring } from "@react-spring/core";
import { animated } from "@react-spring/web";
import { isEmpty } from "lodash";
import { FC, SetStateAction, Dispatch, useState, useEffect } from "react";
import styled from "styled-components";
import Button from "../../../../../components/Button";
import { getUnitIconByName } from "../../../../gamePage/pictures/utils";
import { UnitTemplateWithCount } from "../../../../gamePage/types";

interface IUnit {
  unit?: UnitTemplateWithCount;
  setMoney: Dispatch<SetStateAction<number>>;
  setMyUnits: Dispatch<SetStateAction<UnitTemplateWithCount[]>>;
}

const Unit: FC<IUnit> = ({ unit, setMoney, setMyUnits }) => {
  const [unitsCount, setUnitsCount] = useState<number | undefined>(unit?.count);

  const isNotEmpty = !isEmpty(unit) && unit;

  useEffect(() => {
    setUnitsCount(unit?.count);
  }, [unit]);

  const handleClick = () => {
    if (!unit || !unitsCount) {
      return null;
    }
    setMoney((prevState) => prevState + unit.cost * unitsCount);
    setMyUnits((prevState) => {
      let wasFound = false;
      return prevState.filter(({ count, unitType: currentUnitType }) => {
        if (
          count === unitsCount &&
          unit.unitType === currentUnitType &&
          !wasFound
        ) {
          wasFound = true;
          return false;
        }
        return true;
      });
    });
  };

  const fadeIn = useSpring({
    opacity: isNotEmpty ? 1 : 0,
    marginTop: isNotEmpty ? "0px" : "-100px",
  });

  return (
    <StyledUnitWrapper>
      {isNotEmpty ? (
        <StyledIconWrapper>
          <StyledImgWrapper>
            <StyledImg
              style={fadeIn}
              src={getUnitIconByName(unit.unitType)}
              onClick={handleClick}
            />
          </StyledImgWrapper>
          <StyledCount> {unit.count}</StyledCount>
        </StyledIconWrapper>
      ) : (
        <EmptyUnitContainer />
      )}
    </StyledUnitWrapper>
  );
};

const EmptyUnitContainer = styled.div`
  background-color: #00000070;
  border: 1px solid #ad8e42;
  width: 58px;
  height: 66px;
`;

const StyledIconWrapper = styled.div`
  height: 68px;
  transform: scale(1);
`;

const StyledImgWrapper = styled.div``;

const StyledImg = styled(animated.img)`
  width: 100%;
  border: 1px solid #ad8e42;
  :hover {
    border: 1px solid red;
  }
`;

const StyledUnitWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  :not(:last-child) {
    margin-right: 8px;
  }
`;

const StyledCount = styled(animated.span)`
  position: absolute;
  bottom: 3px;
  right: 5px;
  color: white;
`;

export default Unit;
