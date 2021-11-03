import { FC, useEffect } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { RootState } from "../../../../store/store";
import BattleLog from "./BattleLog";
import ConcedeButton from "./ConcedeButton";
import SkipTurnButton from "./SkipTurnButton";

const Footer: FC = () => {
  return (
    <StyledFooter>
      <SkipTurnButton />
      <BattleLog />
      <ConcedeButton />
    </StyledFooter>
  );
};

const StyledFooter = styled.div`
  display: flex;
  margin-top: 20px;
`;

export default Footer;
