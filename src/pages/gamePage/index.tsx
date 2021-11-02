import { FC } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router";
import { RootState } from "../../store/store";

import Board from "./components/Board";
import Footer from "./components/Footer";
import UnitInfoSidebar from "./components/UnitUnfoSidebar";

const GamePage: FC = () => {
  const board = useSelector((state: RootState) => state.game.board);
  return (
    <>
      {!board.length ? (
        <Redirect to="/ " />
      ) : (
        <GamePageWrapper>
          <UnitInfoSidebar />
          <StyledMainContainer>
            <Board />
            <Footer />
          </StyledMainContainer>
        </GamePageWrapper>
      )}
    </>
  );
};

const GamePageWrapper = styled.div`
  display: flex;
`;

const StyledMainContainer = styled.div``;

export default GamePage;
