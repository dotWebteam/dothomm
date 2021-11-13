import { FC } from "react";
import styled from "styled-components";
import spellbookImage from "../../pictures/spellbook/spellbook.png";

const Spellbook: FC = () => {
  return <StyledSpellbook></StyledSpellbook>;
};

const StyledSpellbook = styled.div`
  background: url(${spellbookImage});
  width: 620px;
  height: 595px;
`;

export default Spellbook;
