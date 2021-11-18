import { FC, useState } from "react";
import styled from "styled-components";

import Button from "../../components/Button";
import Container from "../../components/Container";
import Modal from "../../components/Modal";
import { LOBBY_PAGE_ROUTE } from "../../constants/routeConstants";

import loginLobbyBackground from "../../pictures/loginLobbyBackground.png";
import LoginModal from "./components/LoginModal";

const LoginPage: FC = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      {showModal && (
        <Modal onOutsideClick={() => setShowModal(false)}>
          <LoginModal />
        </Modal>
      )}
      <LoginPageWrapper>
        <Container>
          <StyledTitle>dotHeroes</StyledTitle>
          <StyledSubTitle>
            Heroes of Might and Magic inspired webgame
          </StyledSubTitle>
          <ButtonSection>
            <StyledButton onClick={() => setShowModal(true)}>
              Play online
            </StyledButton>
            <StyledButton to={LOBBY_PAGE_ROUTE}>
              Play offline (hotseat)
            </StyledButton>
          </ButtonSection>
        </Container>
      </LoginPageWrapper>
    </>
  );
};

const StyledTitle = styled.span`
  font-size: 100px;
`;

const StyledSubTitle = styled.span``;

const LoginPageWrapper = styled.div`
  display: flex;
  background: center / cover url(${loginLobbyBackground});
  height: 100vh;
  display: flex;
  justify-content: center;
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
