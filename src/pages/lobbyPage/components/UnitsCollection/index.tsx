import { useState, FC, Dispatch, SetStateAction } from "react";
import styled from "styled-components";

import {
  Unit,
  UnitTemplate,
  UnitTemplateWithCount,
} from "../../../gamePage/types";

import UnitComponent from "./Unit";

interface IUnitsCollection {
  units?: Array<UnitTemplate>;
  setMoney: Dispatch<SetStateAction<number>>;
  setMyUnits: Dispatch<SetStateAction<UnitTemplateWithCount[]>>;
  className?: string;
  money: number;
  totalUnits: Array<UnitTemplate>;
}

const BuyUnitsCollection: FC<IUnitsCollection> = ({
  units,
  className,
  setMoney,
  setMyUnits,
  money,
  totalUnits,
}) => {
  return (
    <StyledUnitsCollection className={className}>
      {units?.map((unit, index) => (
        <UnitComponent
          key={index}
          money={money}
          unit={unit}
          setMoney={setMoney}
          setMyUnits={setMyUnits}
          totalUnits={totalUnits}
        />
      ))}
    </StyledUnitsCollection>
  );
};

const StyledUnitsCollection = styled.div`
  display: flex;
  flex-direction: column;
  height: 278px;
  overflow-y: auto;
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
