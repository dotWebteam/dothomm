import { Dispatch, FC, SetStateAction } from "react";
import styled from "styled-components";
import { UnitTemplate, UnitTemplateWithCount } from "../../../gamePage/types";

import UnitComponent from "./Unit";

interface IMyUnits {
  units?: Array<UnitTemplateWithCount>;
  setMoney: Dispatch<SetStateAction<number>>;
  setMyUnits: Dispatch<SetStateAction<UnitTemplateWithCount[]>>;
  className?: string;
}

const MyUnits: FC<IMyUnits> = ({ units, setMoney, setMyUnits }) => {
  return (
    <StyledMyUnits>
      {units?.map((unit, index) => (
        <UnitComponent
          key={index}
          unit={unit}
          setMoney={setMoney}
          setMyUnits={setMyUnits}
        />
      ))}
    </StyledMyUnits>
  );
};

const StyledMyUnits = styled.div`
  display: flex;
`;

export default MyUnits;
