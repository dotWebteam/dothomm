import { FC, ReactNode } from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";

import alagardFont from "../../fonts/alagard.ttf";

import defaultCursor from "../../pictures/cursor/defaultCursor.png";

interface IModal {
  className?: string;
  children: ReactNode;
}

const rootNode = document.querySelector("#root");

const Modal: FC<IModal> = ({ children, className }) => {
  return rootNode
    ? createPortal(
        <StyledBackground>
          <StyledModal className={className}>{children} </StyledModal>
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
