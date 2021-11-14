import { FC } from "react";
import styled from "styled-components";
import { animated, useSpring } from "react-spring";

interface IDamagePopup {
  show: boolean;
  damage?: number;
}

const DamagePopup: FC<IDamagePopup> = ({ show, damage }) => {
  const styles = useSpring({
    opacity: show ? 1 : 0,
    marginTop: show ? "100px" : "0px",
    marginLeft: show ? "100px" : "0px",
    config: { tension: 500, mass: 0.1 },
  });
  return show ? (
    <StyledSpellEffect style={styles}>{damage}</StyledSpellEffect>
  ) : null;
};

const StyledSpellEffect = styled(animated.div)`
  z-index: 10;
  margin-bottom: 180px;
  margin-right: 30px;
  position: absolute;
`;

export default DamagePopup;
