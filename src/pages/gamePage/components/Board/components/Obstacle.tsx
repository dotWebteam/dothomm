import { FC } from "react";
import styled from "styled-components";

import PlayerIcon from "../../../pictures/Stones.png";

interface IObstacle {
  className?: string;
  id: number;
}

const Obstacle: FC<IObstacle> = ({ className }) => {
  return <StyledImg className={className} src={PlayerIcon} />;
};

const StyledImg = styled.img`
  width: 60px;
  position: absolute;
`;

export default Obstacle;
