import styled from "styled-components";
import defaultCursor from "./pictures/defaultCursor.png";

import Board from "./pages/gamePage/components/Board/Board";

const App = () => {
  return (
    <StyledAppContainer>
      <Board />
    </StyledAppContainer>
  );
};

const StyledAppContainer = styled.div`
  cursor: url(${defaultCursor}), auto;
`;

export default App;
