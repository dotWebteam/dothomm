import { FC } from "react";
import styled from "styled-components";
const Range: FC<any> = (props) => {
  return <StyledRangeInput {...props} />;
};

const StyledRangeInput = styled.input.attrs({ type: "range" })`
  flex: 10;
  -webkit-appearance: none;
  width: 100%;
  background: transparent;

  ::-webkit-slider-thumb {
    -webkit-appearance: none;
    border: 2px solid #ad8e42;
    height: 24px;
    width: 24px;

    background-color: #2d1d0f;
    cursor: pointer;
    margin-top: -1px; /* You need to specify a margin in Chrome, but in Firefox and IE it is automatic */
    margin-left: -1px;

    box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d; /* Add cool effects to your sliders! */
  }

  ::-webkit-slider-runnable-track {
    width: 100%;
    height: 24px;
    cursor: pointer;
    box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
    background-color: #000000a3;
    border-radius: 1.3px;
    border: 1px solid #ad8e42;
  }

  :focus {
    outline: none; /* Removes the blue border. You should probably do some kind of focus styling for accessibility reasons though. */
  }

  ::-ms-track {
    width: 100%;
    cursor: pointer;

    /* Hides the slider so custom styles can be added */
    background: transparent;
    border-color: transparent;
    color: transparent;
  }
`;

export default Range;
