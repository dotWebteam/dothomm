import { FC } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import defaultCursor from "../../pictures/cursor/defaultCursor.png";

import leatherBackground from "../../pictures/leatherBackground.png";

interface IButton {
  to?: string;
}

const Button: FC<IButton> = (props: any) => {
  const { to } = props;
  if (to)
    return (
      <StyledLink to={to}>
        <StyledButton {...props} />
      </StyledLink>
    );
  return <StyledButton {...props} />;
};

const StyledButton = styled.div`
  background: url(${leatherBackground});
  padding: 20px;
  background-color: #2d1d0f;
  border: 1px solid #ad8e42;
  display: flex;
  justify-content: center;
  :active {
    transform: translateY(4px);
  }
  -webkit-box-shadow: 4px 4px 8px 0px rgba(47, 23, 0, 0.68);
  -moz-box-shadow: 4px 4px 8px 0px rgba(47, 23, 0, 0.68);
  box-shadow: 4px 4px 8px 0px rgba(47, 23, 0, 0.68);
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: #ffe98c;
  text-shadow: 2px 2px 0 #000;

  cursor: url(${defaultCursor}), auto;
`;

export default Button;
