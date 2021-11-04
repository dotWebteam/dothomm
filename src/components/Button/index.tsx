import { FC } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import defaultCursor from "../../pictures/cursor/defaultCursor.png";

import buttonBackground from "../../pictures/buttons/buttonBackground.png";
import okButton from "../../pictures/buttons/okButton.png";

interface IButton {
  to?: string;
  onClick?: () => void;
  disabled?: boolean;
  isOk?: boolean;
}

const Button: FC<IButton> = (props) => {
  const { to, onClick, disabled, isOk } = props;

  const ButtonComponent = isOk ? (
    <StyledOKButton onClick={onClick} {...props} />
  ) : (
    <StyledButton onClick={onClick} disabled={disabled} {...props} />
  );

  if (to)
    return (
      <StyledLink disabled={disabled} to={to}>
        {ButtonComponent}
      </StyledLink>
    );
  return ButtonComponent;
};

const StyledOKButton = styled.div`
  background: url(${okButton});
  height: 32px;
  width: 66px;
  background-color: #2d1d0f;
  border: 1px solid #ad8e42;
  display: flex;
  justify-content: center;
  transform: scale(1);
  ::before {
    content: "";
    position: absolute;
    top: 1px;
    right: 1px;
    bottom: 1px;
    left: 1px;
    border: 2px solid rgba(0, 0, 0, 0.8);
    border-top: 2px solid rgba(255, 255, 255, 0.5);
    border-left: 2px solid rgba(255, 255, 255, 0.2);
  }
  :active {
    transform: translateY(4px);
  }
  -webkit-box-shadow: 4px 4px 8px 0px rgba(47, 23, 0, 0.68);
  -moz-box-shadow: 4px 4px 8px 0px rgba(47, 23, 0, 0.68);
  box-shadow: 4px 4px 8px 0px rgba(47, 23, 0, 0.68);
`;

const StyledButton = styled.div<{ disabled?: boolean }>`
  ${({ disabled }) => disabled && "pointer-events: none;"}
  background: url(${buttonBackground});
  padding: 10px 20px;
  background-color: #2d1d0f;
  border: 1px solid #ad8e42;
  display: flex;
  justify-content: center;
  transform: scale(1);
  ::before {
    content: "";
    position: absolute;
    top: 1px;
    right: 1px;
    bottom: 1px;
    left: 1px;
    border: 2px solid rgba(0, 0, 0, 0.8);
    border-top: 2px solid rgba(255, 255, 255, 0.5);
    border-left: 2px solid rgba(255, 255, 255, 0.2);
  }
  :active {
    transform: translateY(4px);
  }
  -webkit-box-shadow: 4px 4px 8px 0px rgba(47, 23, 0, 0.68);
  -moz-box-shadow: 4px 4px 8px 0px rgba(47, 23, 0, 0.68);
  box-shadow: 4px 4px 8px 0px rgba(47, 23, 0, 0.68);
`;

const StyledLink = styled(Link)<{ disabled?: boolean }>`
  ${({ disabled }) => disabled && "pointer-events: none;"}
  text-decoration: none;
  color: #ffe98c;
  text-shadow: 2px 2px 0 #000;

  cursor: url(${defaultCursor}), auto;
`;

export default Button;
