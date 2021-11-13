import { FC, useState } from "react";
import styled from "styled-components";
import Button from "../../../../../components/Button";
import Modal from "../../../../../components/Modal";
import Spellbook from "../../Spellbook";
import spellbookIcon from "../../../../../pictures/spellbook.png";

const SpellbookButton: FC = () => {
  const [showModal, setShowModal] = useState(false);

  const handleClick = () => {
    setShowModal(true);
  };

  return (
    <>
      {showModal && (
        <Modal onOutsideClick={() => setShowModal(false)}>
          <Spellbook />
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
