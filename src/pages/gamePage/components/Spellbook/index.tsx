import { FC } from "react";
import styled from "styled-components";
import spellbookImage from "../../pictures/spellbook/spellbook.png";

import LIST_OF_SPELLS from "../../../../constants/listOfSpells";
import SpellInBook from "./components/SpellInBook";

interface ISpellbook {
  onCastSpell: () => void;
}

const Spellbook: FC<ISpellbook> = ({ onCastSpell }) => {
  return (
    <StyledSpellbook>
      <StyledSpellsSection>
        {LIST_OF_SPELLS.map((spell, index) => (
          <SpellInBook key={index} spell={spell} onCastSpell={onCastSpell} />
        ))}
      </StyledSpellsSection>
    </StyledSpellbook>
  );
};

const StyledSpellbook = styled.div`
  background: url(${spellbookImage});
  width: 620px;
  height: 595px;
  transform: scale(1);
`;

const StyledSpellsSection = styled.div`
  position: absolute;
  top: 120px;
  left: 160px;
`;

export default Spellbook;
