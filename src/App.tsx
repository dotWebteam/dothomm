import styled from "styled-components";
import defaultCursor from "./pictures/cursor/defaultCursor.png";
import alagardFont from "./fonts/alagard.ttf";

import { HashRouter as Router, Switch, Route } from "react-router-dom";

import GamePage from "./pages/gamePage";
import LoginPage from "./pages/loginPage";
import LobbyPage from "./pages/lobbyPage";

import {
  GAME_PAGE_ROUTE,
  LOBBY_PAGE_ROUTE,
  LOGIN_PAGE_ROUTE,
} from "./constants/routeConstants";
import Header from "./components/Header";

const App = () => {
  return (
    <StyledAppContainer>
      <Header />
      <Router>
        <Switch>
          <Route path={LOBBY_PAGE_ROUTE}>
            <LobbyPage />
          </Route>
          <Route path={GAME_PAGE_ROUTE}>
            <GamePage />
          </Route>
          <Route path={LOGIN_PAGE_ROUTE}>
            <LoginPage />
          </Route>
        </Switch>
      </Router>
    </StyledAppContainer>
  );
};

const StyledAppContainer = styled.div`
  cursor: url(${defaultCursor}), auto;
  @font-face {
    font-family: "Alagard";
    src: url(${alagardFont}) format("truetype");
  }
  font-family: Alagard;
  color: #ffe98c;
  text-shadow: 2px 2px 0 #000;
  user-select: none;
`;

export default App;
