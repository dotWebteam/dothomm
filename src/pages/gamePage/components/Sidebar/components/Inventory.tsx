import { FC } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { RootState } from "../../../../../store/store";
import { Rarity } from "../../../types";

const Inventory: FC = () => {
  const activePlayerArtifacts = useSelector(
    (state: RootState) => state.game.myArtifacts
  );
  return (
    <StyledInventory>
      <StyledTitle>Artifacts</StyledTitle>
      {activePlayerArtifacts.map(
        ({ humanReadableName, rarity, description, iconSrc }, index) => (
          <StyledArtifact key={index} rarity={rarity}>
            <StyledInfo>
              {humanReadableName}
              <StyledHorizontalLine />
              <StyledText>{description}</StyledText>
            </StyledInfo>
            <StyledImg src={iconSrc} />
          </StyledArtifact>
        )
      )}
      {!activePlayerArtifacts.length && (
        <StyledNoArtifacts>
          Your inventory is full of emptiness
        </StyledNoArtifacts>
      )}
    </StyledInventory>
  );
};

const StyledInventory = styled.div`
  border: 1px solid #ffe98c;
  background: #0000007a;
  height: 100%;
  margin: 20px 0 20px 20px;
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

const StyledTitle = styled.div`
  display: flex;
  justify-content: center;
  padding: 5px 10px;
  border: 1px solid #ffe98c;
  background: rgb(138, 110, 9);
  background: radial-gradient(
    circle,
    rgba(138, 110, 9, 1) 0%,
    rgba(62, 53, 23, 1) 100%
  );
`;

const StyledInfo = styled.div`
  display: flex;
  flex-direction: column;
  width: 200px;
`;

const StyledText = styled.div`
  font-size: 14px;
`;

const StyledImg = styled.img``;

const StyledHorizontalLine = styled.hr`
  width: 100%;
  border: 1px solid;
  border-radius: 4px;
  box-shadow: 2px 2px 0 #000;
  margin-top: 4px;
  margin-bottom: 4px;
`;

const StyledArtifact = styled.div<{ selected?: boolean; rarity: Rarity }>`
  margin: 10px;
  padding: 10px;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  border: 1px solid #ad8e42;
  position: relative;
  :before {
    content: " ";
    position: absolute;
    z-index: 1;
    top: 0px;
    left: 0px;
    right: 0px;
    bottom: 0px;
    ${({ rarity }) => {
      if (rarity === "EPIC") return `border: 1px solid #9800ff`;
      if (rarity === "RARE") return `border: 1px solid #0024ff`;
      if (rarity === "COMMON") return `border: 1px solid #979797`;
    }};
  }

  background-color: ${({ selected }) => (selected ? "#000000a3" : "#00000070")};
  :not(:last-child) {
    margin-bottom: 8px;
  }
`;

const StyledNoArtifacts = styled.div`
  max-width: 290px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: inherit;
  color: #80808099;
  text-shadow: 2px 2px 0 #00000091;
  font-size: 20px;
  text-align: center;
`;

export default Inventory;
