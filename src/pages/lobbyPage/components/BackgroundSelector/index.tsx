import { FC } from "react";
import styled from "styled-components";
import { getBackgroundsList } from "../../../gamePage/pictures/utils";
import { BackgroundType } from "../../../gamePage/types";

interface IBackgroundSelector {
  selectedBackgroundName: BackgroundType;
  onSelect: (backgroundName: BackgroundType) => void;
}

const BackgroundSelector: FC<IBackgroundSelector> = ({
  selectedBackgroundName,
  onSelect,
}) => {
  return (
    <StyledWrapper>
      <StyledTitle>Choose background</StyledTitle>
      <StyledBackgroundsList>
        {getBackgroundsList().map(({ src, name }, index) => (
          <StyledBackgroundOption
            key={index}
            onClick={() => onSelect(name as BackgroundType)}
            selected={name === selectedBackgroundName}
          >
            <div>{name}</div>
            <StyledImg src={src} />
          </StyledBackgroundOption>
        ))}
      </StyledBackgroundsList>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div``;

const StyledTitle = styled.div`
  font-size: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 10px;
`;

const StyledImg = styled.img`
  width: 50px;
  border: 1px solid #ad8e42;
  margin-left: 16px;
`;

const StyledBackgroundOption = styled.div<{ selected?: boolean }>`
  padding: 10px;
  display: flex;
  align-items: center;
  width: 280px;
  justify-content: space-between;
  border: 1px solid #ad8e42;
  background-color: ${({ selected }) => (selected ? "#000000a3" : "#00000070")};
  :not(:last-child) {
    margin-bottom: 8px;
  }
`;

const StyledBackgroundsList = styled.div`
  height: 318px;
  overflow-y: auto;
  ::-webkit-scrollbar-track {
    display: none;
  }
  ::-webkit-scrollbar {
    width: 0px;
  }
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
`;

export default BackgroundSelector;
