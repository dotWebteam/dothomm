import { useState, FC, Dispatch, SetStateAction } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

import {
  Unit,
  UnitTemplate,
  UnitTemplateWithCount,
} from "../../../gamePage/types";
import { getCurrentUserArmy } from "../../selectors";

import UnitComponent from "./Unit";

interface IUnitsCollection {
  units?: Array<UnitTemplate>;
  className?: string;
  money: number;
  totalUnits: Array<UnitTemplate>;
}

const BuyUnitsCollection: FC<IUnitsCollection> = ({
  units,
  className,
  money,
}) => {
  const totalUnits = useSelector(getCurrentUserArmy);
  return (
    <StyledUnitsCollection className={className}>
      {units?.map((unit, index) => (
        <UnitComponent
          key={index}
          money={money}
          unit={unit}
          totalUnits={totalUnits}
        />
      ))}
    </StyledUnitsCollection>
  );
};

const StyledUnitsCollection = styled.div`
  margin-top: 20px;
  width: 640px;
  height: 86px;
  display: flex;
  overflow-x: auto;
  overflow-y: hidden;
  ::-webkit-scrollbar-track {
    display: none;
  }
  ::-webkit-scrollbar {
    width: 0px;
  }
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
`;

export default BuyUnitsCollection;
