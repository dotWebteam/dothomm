import styled from "styled-components";
import defaultCursor from "./pictures/cursor/defaultCursor.png";
import alagardFont from "./fonts/alagard.ttf";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import GamePage from "./pages/gamePage";
import LoginPage from "./pages/loginPage";
import LobbyPage from "./pages/lobbyPage";

const App = () => {
  return (
    <StyledAppContainer>
      <Router>
        <Switch>
          <Route path="/lobby">
            <LobbyPage />
          </Route>
          <Route path="/game">
            <GamePage />
          </Route>
          <Route path="/">
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
`;

export default App;
