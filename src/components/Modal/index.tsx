import { FC, MouseEventHandler, ReactNode } from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";

import alagardFont from "../../fonts/alagard.ttf";

import defaultCursor from "../../pictures/cursor/defaultCursor.png";

interface IModal {
  className?: string;
  children: ReactNode;
  onOutsideClick?: () => void;
}

const rootNode = document.querySelector("#root");

const Modal: FC<IModal> = ({ children, className, onOutsideClick }) => {
  const handleOutsideClick = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    if (onOutsideClick) onOutsideClick();
  };

  const handleInsideClick = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return rootNode
    ? createPortal(
        <StyledBackground onClick={handleOutsideClick}>
          <StyledModal className={className} onClick={handleInsideClick}>
            {children}
          </StyledModal>
        </StyledBackground>,
        rootNode
      )
    : null;
};

const StyledBackground = styled.div`
  position: fixed;
  top: 0;
  background: #1e171796;
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;

  cursor: url(${defaultCursor}), auto;
  @font-face {
    font-family: "Alagard";
    src: url(${alagardFont}) format("truetype");
  }
  font-family: Alagard;
  color: #ffe98c;
  text-shadow: 2px 2px 0 #000;
`;

const StyledModal = styled.div``;

export default Modal;
