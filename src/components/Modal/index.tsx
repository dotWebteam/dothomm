import { FC, MouseEventHandler, ReactNode } from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";
import { animated, useSpring } from "react-spring";

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

  const modalStyles = useSpring({
    to: [{ opacity: 1, marginTop: "0px" }],
    from: { opacity: 0, marginTop: "100px" },
  });

  const backgroundStyles = useSpring({
    to: [{ opacity: 1 }],
    from: { opacity: 0 },
  });

  return rootNode
    ? createPortal(
        <StyledBackground onClick={handleOutsideClick} style={backgroundStyles}>
          <StyledModal
            className={className}
            onClick={handleInsideClick}
            style={modalStyles}
          >
            {children}
          </StyledModal>
        </StyledBackground>,
        rootNode
      )
    : null;
};

const StyledBackground = styled(animated.div)`
  user-select: none;
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

const StyledModal = styled(animated.div)``;

export default Modal;
