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
}

const BuyUnitsCollection: FC<IUnitsCollection> = ({
  units,
  className,
  setMoney,
  setMyUnits,
}) => {
  return (
    <StyledUnitsCollection className={className}>
      {units?.map((unit) => (
        <UnitComponent
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
