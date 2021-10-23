import styled from "styled-components";
import defaultCursor from "./pictures/defaultCursor.png";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

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
`;

export default App;
