import { FC } from "react";
import styled from "styled-components";

import alagardFont from "../../fonts/alagard.ttf";

import defaultCursor from "../../pictures/cursor/defaultCursor.png";

interface IInput {
  className?: string;
  type?: string;
  min?: string;
  value?: any;
  onChange?: (e: any) => void;
}

const Input: FC<IInput> = (props) => {
  return <StyledInput {...props} />;
};

const StyledInput = styled.input`
  padding: 10px;
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
  margin: 0;
  -moz-appearance: textfield;
  background: #1e171796;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #ad8e42;
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

export default Input;
