import { FC } from "react";
import styled from "styled-components";
import Button from "../../../../../components/Button";
import helmIcon from "../../../../../pictures/helm.png";

const DefendButton: FC = () => {
  const handleClick = () => null;

  return (
    <StyledButton onClick={handleClick}>
      <img src={helmIcon} />
    </StyledButton>
  );
};

const StyledButton = styled(Button)`
  width: 26px;
`;

export default DefendButton;
