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
}

const BuyUnitsCollection: FC<IUnitsCollection> = ({
  units,
  className,
  setMoney,
  setMyUnits,
  money,
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
        />
      ))}
    </StyledUnitsCollection>
  );
};

const StyledUnitsCollection = styled.div`
  display: flex;
  overflow-y: auto;
`;

export default BuyUnitsCollection;
