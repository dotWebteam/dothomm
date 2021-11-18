import { FC, ReactNode } from "react";
import styled from "styled-components";
import { animated, useSpring } from "react-spring";

import leatherBackground from "../../pictures/leatherBackground.png";
import windowBorder from "../../pictures/windowBorders.png";

interface IContainer {
  children: ReactNode;
  className?: string;
}

const Container: FC<IContainer> = ({ children, className }) => {
  const fadeIn = useSpring({
    from: { opacity: 0, marginTop: "10px" },
    to: { opacity: 1, marginTop: "0px" },
  });
  return (
    <StyledContainer style={fadeIn} className={className}>
      {children}
    </StyledContainer>
  );
};

const StyledContainer = styled(animated.div)`
  background: url(${leatherBackground});
  padding: 40px;
  background-color: #2d1d0f;
  border: 1px solid #ad8e42;
  border-image: url(${windowBorder}) 40 / 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default Container;
