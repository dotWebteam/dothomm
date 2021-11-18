import { FC } from "react";
import styled from "styled-components";

import leatherBackground from "../../pictures/leatherBackground.png";

const Header: FC = () => {
  return (
    <StyledHeaderWrapper>
      <StyledHeader></StyledHeader>
    </StyledHeaderWrapper>
  );
};

const StyledHeaderWrapper = styled.div`
  display: flex;
  position: absolute;
  top: 20px;
  width: 100%;
  justify-content: center;
  display: none;
`;

const StyledHeader = styled.div`
  height: 60px;
  width: 60%;
  background: url(${leatherBackground});
`;

export default Header;
