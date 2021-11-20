import { useSpring } from "@react-spring/core";
import { animated } from "@react-spring/web";
import { FC, useMemo } from "react";
import styled from "styled-components";
import Modal from "../Modal";
import loadingIcon from "../../pictures/clock.png";
import { getRandomLoadingPhrase } from "./utils";

interface ILoadingThrobber {
  style: any;
}

const LoadingThrobber: FC<ILoadingThrobber> = ({ style }) => {
  const clockStyle = useSpring({
    loop: true,
    from: { rotateZ: 0 },
    to: { rotateZ: 180 },
  });

  const labelStyle = useSpring({
    loop: { reverse: true },
    config: { duration: 1000 },
    from: { opacity: 0 },
    to: { opacity: 1 },
  });

  const loadingPhrase = useMemo(() => getRandomLoadingPhrase(), []);

  return (
    <StyledThrobberBackground customBackgroundStyle={style}>
      <StyledTrobberContainer>
        <StyledLoadingThrobber src={loadingIcon} style={clockStyle} />
        <StyledLabel style={labelStyle}>{loadingPhrase}</StyledLabel>
      </StyledTrobberContainer>
    </StyledThrobberBackground>
  );
};

const StyledThrobberBackground = styled(Modal)``;

const StyledLabel = styled(animated.div)`
  font-size: 24px;
  margin-top: 10px;
`;

const StyledTrobberContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const StyledLoadingThrobber = styled(animated.img)`
  width: 40px;
`;

export default LoadingThrobber;
