import { FC } from "react";
import styled from "styled-components";
import loginLobbyBackground from "../../pictures/loginLobbyBackground.png";

import Button from "../../components/Button";

import leatherBackground from "../../pictures/leatherBackground.png";

const LoginPage: FC = () => {
  return (
    <LoginPageWrapper>
      <LoginContainer>
        <StyledTitle>dotHeroes</StyledTitle>
        <StyledSubTitle>
          Heroes of Might and Magic inspired webgame
        </StyledSubTitle>
        <ButtonSection>
          <StyledButton> Play online</StyledButton>
          <StyledButton to="/lobby">Play offline mode (hotseat)</StyledButton>
        </ButtonSection>
      </LoginContainer>
    </LoginPageWrapper>
  );
};

const StyledTitle = styled.span`
  font-size: 100px;
`;

const StyledSubTitle = styled.span``;

const LoginPageWrapper = styled.div`
  display: flex;
  background: url(${loginLobbyBackground});
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LoginContainer = styled.div`
  background: url(${leatherBackground});
  padding: 20px;
  background-color: #2d1d0f;
  border: 1px solid #ad8e42;
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

export default LoginPage;
