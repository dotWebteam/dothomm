import { FC, useState } from "react";
import styled from "styled-components";
import Button from "../../../../../components/Button";
import Modal from "../../../../../components/Modal";
import Spellbook from "../../Spellbook";
import spellbookIcon from "../../../../../pictures/spellbook.png";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../store/store";

const SpellbookButton: FC = () => {
  const [showModal, setShowModal] = useState(false);

  const spellPoints = useSelector((state: RootState) => state.game.spellPoints);

  const handleClick = () => {
    if (spellPoints.isTired || spellPoints.current <= 0) return null;
    setShowModal(true);
  };

  return (
    <>
      {showModal && (
        <Modal onOutsideClick={() => setShowModal(false)}>
          <Spellbook onCastSpell={() => setShowModal(false)} />
        </Modal>
      )}
      <StyledButton onClick={handleClick}>
        <img src={spellbookIcon} />
      </StyledButton>
    </>
  );
};

const StyledButton = styled(Button)`
  width: 20px;
`;

export default SpellbookButton;
