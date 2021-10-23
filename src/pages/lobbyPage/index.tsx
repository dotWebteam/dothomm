import { FC } from "react";
import styled from "styled-components";

import Button from "../../components/Button";

import loginLobbyBackground from "../../pictures/loginLobbyBackground.png";
import leatherBackground from "../../pictures/leatherBackground.png";
import windowBorder from "../../pictures/windowBorders.png";

const LobbyPage: FC = () => {
  return (
    <LobbyPageWrapper>
      <LoginContainer>
        <StyledTitle>Match Lobby</StyledTitle>
        <StyledSubTitle>
          Heroes of Might and Magic inspired webgame
        </StyledSubTitle>
        <Button to="/game"> Start the game! </Button>
      </LoginContainer>
    </LobbyPageWrapper>
  );
};

const StyledTitle = styled.span`
  font-size: 100px;
`;

const StyledSubTitle = styled.span``;

const LobbyPageWrapper = styled.div`
  display: flex;
  background: url(${loginLobbyBackground});
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LoginContainer = styled.div`
  background: url(${leatherBackground});
  padding: 40px;
  background-color: #2d1d0f;
  border: 1px solid #ad8e42;
  border-image: url(${windowBorder}) 40 / 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ButtonSection = styled.div`
  display: flex;
  width: 100%;
`;

const StyledButton = styled(Button)`
  flex: 1;
  margin-top: 8px;
  :last-child {
    margin-left: 8px;
  }
`;

export default LobbyPage;
