import { FC } from "react";
import styled from "styled-components";
import Container from "../../../../../components/Container";
import Modal from "../../../../../components/Modal";
import { Unit } from "../../../types";
import UnitStats from "./UnitStats";

interface IUnitInfoPopup {
  unit: Unit;
  onHide: () => void;
}

const UnitInfoPopup: FC<IUnitInfoPopup> = ({ unit, onHide }) => {
  return (
    <StyledUnitInfoPopup onOutsideClick={onHide}>
      <Container>
        <UnitStats unit={unit} />
      </Container>
    </StyledUnitInfoPopup>
  );
};

const StyledUnitInfoPopup = styled(Modal)`
  background: none !important;
`;

export default UnitInfoPopup;
