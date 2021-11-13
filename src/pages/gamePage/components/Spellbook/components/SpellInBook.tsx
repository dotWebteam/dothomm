import { FC } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { startCastSpell } from "../../../boardSlice";
import { Spell } from "../../../types";

interface ISpellInBook {
  spell: Spell;
  onCastSpell: () => void;
}

const SpellInBook: FC<ISpellInBook> = ({ spell, onCastSpell }) => {
  const { name, iconSrc, cost } = spell;

  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(startCastSpell({ spellName: name, cost: cost }));
    onCastSpell();
  };

  return (
    <StyledSpellInBook onClick={handleClick}>
      <StyledSpellImg src={iconSrc} />
      <StyledSpellName>{name}</StyledSpellName>
    </StyledSpellInBook>
  );
};

const StyledSpellInBook = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledSpellImg = styled.img``;

const StyledSpellName = styled.span``;

export default SpellInBook;
