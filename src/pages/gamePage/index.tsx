import { FC, useState } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { Redirect } from "react-router";
import { RootState } from "../../store/store";

import Board from "./components/Board";
import Footer from "./components/Footer";

import leatherBackground from "../../pictures/leatherBackground.png";
import marbleBackground from "../../pictures/marbleBackground.png";
import { LOGIN_PAGE_ROUTE } from "../../constants/routeConstants";
import { useTransition } from "@react-spring/core";
import LoadingThrobber from "../../components/LoadingThrobber";
import { useTimeout } from "../../utils/useTimeout";

const GamePage: FC = () => {
  const [loading, setLoading] = useState(true);

  const transition = useTransition(loading, {
    from: { opacity: 0, marginTop: "100px" },
    enter: { opacity: 1, marginTop: "0px" },
    leave: { opacity: 0, marginTop: "-100px" },
  });

  useTimeout(() => setLoading(false), 1000, []);

  const board = useSelector((state: RootState) => state.game.board);
  return (
    <>
      {!board.length ? (
        <Redirect to={LOGIN_PAGE_ROUTE} />
      ) : (
        <>
          {transition((style, item) =>
            item ? <LoadingThrobber style={style} /> : null
          )}
          <GamePageWrapper>
            <GamePageContainer>
              <StyledMainContainer>
                <Board />
                <Footer />
              </StyledMainContainer>
            </GamePageContainer>
          </GamePageWrapper>
        </>
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
