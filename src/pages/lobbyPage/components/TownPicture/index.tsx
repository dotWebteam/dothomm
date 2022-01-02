import { FC } from "react";
import styled from "styled-components";

import CastleTownPicture from "../../pictures/castleTown.png";

const TownPicture: FC = () => {
  return (
    <StyledTownPicture>
      <StyledTitle>Preparing for battle</StyledTitle>
      <StyledGradient />
      <StyledImg src={CastleTownPicture} />
    </StyledTownPicture>
  );
};

const StyledTitle = styled.span`
  position: absolute;
  bottom: 20px;
  left: 30px;
  font-size: 36px;
  z-index: 2;
`;

const StyledGradient = styled.div`
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  position: absolute;
  border: 2px solid #ad8e42;
  background: linear-gradient(
    0deg,
    rgb(49 32 16 / 69%) 0%,
    rgba(255, 255, 255, 0) 100%
  );
`;

const StyledTownPicture = styled.div`
  position: relative;
`;

const StyledImg = styled.img``;

export default TownPicture;
