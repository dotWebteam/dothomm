import { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Button from "../../../../../components/Button";
import { concede } from "../../../boardSlice";

import forbiddenIcon from "../../../../../pictures/forbidden.png";
import leatherBackground from "../../../../../pictures/leatherBackground.png";
import windowBorder from "../../../../../pictures/windowBorders.png";
import Modal from "../../../../../components/Modal";

const ConcedeButton: FC = () => {
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleConcede = () => {
    dispatch(concede());
    setShowModal(false);
  };

  return (
    <>
      {showModal && (
        <Modal onOutsideClick={() => setShowModal(false)}>
          <StyledModalWindow>
            Are you sure you want to concede?
            <Button isOk onClick={handleConcede} />
          </StyledModalWindow>
        </Modal>
      )}
      <Button onClick={handleShowModal}>
        <img src={forbiddenIcon} />
      </Button>
    </>
  );
};

const StyledModalWindow = styled.div`
  min-height: 80px;
  min-width: 150px;
  background: url(${leatherBackground});
  padding: 40px;
  background-color: #2d1d0f;
  border: 1px solid #ad8e42;
  border-image: url(${windowBorder}) 40 / 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

export default ConcedeButton;
