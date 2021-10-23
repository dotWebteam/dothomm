import { FC } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const LobbyPage: FC = () => {
  return (
    <LobbyPageWrapper>
      <Link to="/game">
        <button> Start the game! </button>
      </Link>
    </LobbyPageWrapper>
  );
};

const LobbyPageWrapper = styled.div`
  display: flex;
`;

export default LobbyPage;
