import { FC } from "react";
import styled from "styled-components";

import { getObstacleSpriteByName } from "../../../pictures/utils";
import { ObstacleType } from "../../../types";

interface IObstacle {
  className?: string;
  obstacleType: ObstacleType;
}

const Obstacle: FC<IObstacle> = ({ className, obstacleType }) => {
  return (
    <StyledImg
      className={className}
      src={getObstacleSpriteByName(obstacleType)}
    />
  );
};

const StyledImg = styled.img`
  width: 60px;
  position: absolute;
`;

export default Obstacle;
