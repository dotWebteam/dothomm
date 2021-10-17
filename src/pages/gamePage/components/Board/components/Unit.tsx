import { FC } from "react";
import styled from "styled-components";

import PlayerIcon from "../../../pictures/Hero.png";

interface IUnit {
  classname?: string;
  unitID: number;
}

const Unit: FC<IUnit> = ({ classname }) => {
  return <StyledImg src={PlayerIcon} />;
};

const StyledImg = styled.img`
  width: 70px;
  position: absolute;
`;

export default Unit;
