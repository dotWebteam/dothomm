import { Dispatch, FC, SetStateAction } from "react";
import styled from "styled-components";
import LIST_OF_ARTIFACTS from "../../../../constants/listOfArtifacts";
import { Artifact } from "../../../gamePage/types";

interface IArtifactsShop {
  artifactArr: Artifact[];
  setArtifactArr: Dispatch<SetStateAction<Artifact[]>>;
  money: number;
  setMoney: Dispatch<SetStateAction<number>>;
}

const ArtifactsShop: FC<IArtifactsShop> = ({
  artifactArr,
  setArtifactArr,
  money,
  setMoney,
}) => {
  return (
    <StyledWrapper>
      <StyledTitle>Buy items</StyledTitle>
      <StyledArtifactsList>
        {LIST_OF_ARTIFACTS.map((artifact, index) => {
          const { humanReadableName, cost, iconSrc, description } = artifact;

          const indexInArr = artifactArr.findIndex(
            (currentArtifact) => artifact === currentArtifact
          );

          const selected = indexInArr !== -1;

          const handleClick = () => {
            if (selected) {
              setArtifactArr((prevState) =>
                prevState.filter((artifact, index) => index !== indexInArr)
              );
              setMoney((prevState) => prevState + cost);
              return null;
            }
            if (money - cost < 0) return null;
            artifactArr.push(artifact);
            setMoney((prevState) => prevState - cost);
          };

          return (
            <StyledArtifactOption
              key={index}
              onClick={handleClick}
              selected={selected}
            >
              <StyledInfo>
                {humanReadableName}
                <StyledHorizontalLine />
                <StyledText>
                  {description}
                  <br />
                  Cost: {cost}
                </StyledText>
              </StyledInfo>
              <StyledImg src={iconSrc} />
            </StyledArtifactOption>
          );
        })}
      </StyledArtifactsList>
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

const StyledInfo = styled.div`
  display: flex;
  flex-direction: column;
  width: 200px;
`;

const StyledHorizontalLine = styled.hr`
  width: 100%;
  border: 1px solid;
  border-radius: 4px;
  box-shadow: 2px 2px 0 #000;
  margin-top: 4px;
  margin-bottom: 4px;
`;

const StyledText = styled.div`
  font-size: 14px;
`;

const StyledImg = styled.img``;

const StyledArtifactOption = styled.div<{ selected?: boolean }>`
  padding: 10px;
  display: flex;
  align-items: flex-start;
  width: 280px;
  justify-content: space-between;
  border: 1px solid #ad8e42;
  background-color: ${({ selected }) => (selected ? "#000000a3" : "#00000070")};
  :not(:last-child) {
    margin-bottom: 8px;
  }
`;

const StyledArtifactsList = styled.div`
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

export default ArtifactsShop;
