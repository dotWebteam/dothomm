import { FC } from "react";
import styled from "styled-components";

import { getDeadBodySpriteByName } from "../../../pictures/utils";
import { DeadBodyType } from "../../../types";

interface IDeadBody {
  className?: string;
  deadBodyType: DeadBodyType;
}

const DeadBody: FC<IDeadBody> = ({ className, deadBodyType }) => {
  return (
    <StyledImg
      className={className}
      src={getDeadBodySpriteByName(deadBodyType)}
    />
  );
};

const StyledImg = styled.img`
  width: 60px;
  position: absolute;
`;

export default DeadBody;
