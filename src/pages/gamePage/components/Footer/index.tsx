import { FC, useEffect } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { RootState } from "../../../../store/store";
import BattleLog from "./BattleLog";
import ConcedeButton from "./ConcedeButton";
import SkipTurnButton from "./SkipTurnButton";
import SpellbookButton from "./SpellbookButton";

const Footer: FC = () => {
  return (
    <StyledFooter>
      <SkipTurnButton />
      <SpellbookButton />
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
