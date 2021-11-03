import { FC } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { Redirect } from "react-router";
import { RootState } from "../../store/store";

import Board from "./components/Board";
import Footer from "./components/Footer";

import leatherBackground from "../../pictures/leatherBackground.png";
import marbleBackground from "../../pictures/marbleBackground.png";

const GamePage: FC = () => {
  const board = useSelector((state: RootState) => state.game.board);
  return (
    <>
      {!board.length ? (
        <Redirect to="/ " />
      ) : (
        <GamePageWrapper>
          <GamePageContainer>
            <StyledMainContainer>
              <Board />
              <Footer />
            </StyledMainContainer>
          </GamePageContainer>
        </GamePageWrapper>
      )}
    </>
  );
};

const GamePageWrapper = styled.div`
  display: flex;

  height: 100vh;
  align-items: center;
  justify-content: center;
  background: url(${marbleBackground});
`;

const GamePageContainer = styled.div`
  display: flex;
  padding: 20px;
  border: 1px solid #ffe98c;
  background: url(${leatherBackground});
`;

const StyledMainContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export default GamePage;
