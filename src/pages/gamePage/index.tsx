import { FC } from "react";
import styled from "styled-components";

import Board from "./components/Board";
import Footer from "./components/Footer";
import UnitInfoSidebar from "./components/UnitUnfoSidebar";

const gamePage: FC = () => {
  return (
    <GamePageWrapper>
      <UnitInfoSidebar />
      <StyledMainContainer>
        <Board />
        <Footer />
      </StyledMainContainer>
    </GamePageWrapper>
  );
};

const GamePageWrapper = styled.div`
  display: flex;
`;

const StyledMainContainer = styled.div``;

export default gamePage;
