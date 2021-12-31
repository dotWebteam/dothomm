import { ReactNode, FC, useState, useRef } from "react";
import styled from "styled-components";

interface ITooltip {
  children?: ReactNode;
  TooltipContent: any;
}

const Tooltip: FC<ITooltip> = ({ children, TooltipContent }) => {
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const tooltipRef = useRef(null);

  let timer: NodeJS.Timeout;
  const handleMouseEnter = () => {
    timer = setTimeout(() => setTooltipVisible(true), 400);
  };

  const handleMouseLeave = () => {
    clearTimeout(timer);
    setTooltipVisible(false);
  };

  return (
    <StyledTooltipContainer ref={tooltipRef}>
      <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        {children}
      </div>

      <StyledTooltip isVisible={tooltipVisible}>
        <TooltipContent />
      </StyledTooltip>
    </StyledTooltipContainer>
  );
};

const StyledTooltipContainer = styled.div`
  position: relative;
`;

const StyledTooltip = styled.div<{ isVisible: boolean }>`
  visibility: ${({ isVisible }) => (isVisible ? "visible" : "hidden")};
  position: absolute;
  z-index: 1;
  transition: opacity 1s;
  margin-top: 4px;
`;

export default Tooltip;
