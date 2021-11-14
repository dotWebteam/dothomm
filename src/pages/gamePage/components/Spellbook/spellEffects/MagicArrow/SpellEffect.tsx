import { FC } from "react";
import styled from "styled-components";
import { animated, useSpring } from "react-spring";

interface ISpellEffect {
  imgSrc: string;
  show: boolean;
}

const SpellEffect: FC<ISpellEffect> = ({ imgSrc, show }) => {
  const styles = useSpring({
    opacity: show ? 1 : 0,
    marginTop: show ? "100px" : "0px",
    marginLeft: show ? "100px" : "0px",
    config: { tension: 500, mass: 0.1 },
  });
  return show ? (
    <StyledSpellEffect style={styles}>
      <StyledImg src={imgSrc} />
    </StyledSpellEffect>
  ) : null;
};

const StyledSpellEffect = styled(animated.div)`
  z-index: 10;
  margin-bottom: 140px;
  margin-right: 140px;
`;

const StyledImg = styled.img`
  transform: scale(1.3) rotate(-45deg);
`;

export default SpellEffect;
