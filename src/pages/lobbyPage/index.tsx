import { FC, useState } from "react";
import styled from "styled-components";

import Button from "../../components/Button";
import Container from "../../components/Container";

import UnitsCollection from "./components/UnitsCollection";

import { useDispatch, useSelector } from "react-redux";
import { initBoard } from "../gamePage/boardSlice";

import loginLobbyBackground from "../../pictures/loginLobbyBackground.png";
import leatherBackground from "../../pictures/leatherBackground.png";
import windowBorder from "../../pictures/windowBorders.png";

import MyUnits from "./components/MyUnits";

import goldIcon from "../../pictures/gold.png";
import { PLAYERS } from "../../constants/players";
import Modal from "../../components/Modal";
import BackgroundSelector from "./components/BackgroundSelector";

import { BackgroundType } from "../gamePage/types";
import ArtifactsShop from "./components/ArtifactsShop";
import { RootState } from "../../store/store";
import { goToSecondPlayer, setBackground } from "./lobbySlice";
import {
  getCurrentPlayerName,
  getCurrentUserArmy,
  getIsFirstPlayerActive,
} from "./selectors";

import LIST_OF_UNITS from "../../constants/listOfUnits";
import TownPicture from "./components/TownPicture";
import marbleBackground from "../../pictures/marbleBackground.png";

const LobbyPage: FC = () => {
  const units = useSelector(getCurrentUserArmy);

  const firstPlayerUnits = useSelector(
    (state: RootState) => state.lobby.firstArmy
  );
  const secondPlayerUnits = useSelector(
    (state: RootState) => state.lobby.secondArmy
  );

  const hasValidAmountOfMinions = units.length > 0 && units.length < 6;

  const isFirstPlayer = useSelector(getIsFirstPlayerActive);

  const currentPlayerName = useSelector(getCurrentPlayerName);

  const dispatch = useDispatch();

  const handleGoToSecondPlayer = () => {
    if (!hasValidAmountOfMinions) {
      setShowModal(true);
      return null;
    }
    dispatch(goToSecondPlayer());
  };

  const firstPlayerArtifactArr = useSelector(
    (state: RootState) => state.lobby.firstEquip
  );
  const secondPlayerArtifactArr = useSelector(
    (state: RootState) => state.lobby.secondEquip
  );

  const combatBackgroundName = useSelector(
    (state: RootState) => state.lobby.backgroundName
  );

  const changeBackgroundName = (backgroundName: BackgroundType) =>
    dispatch(setBackground({ backgroundName }));

  const handleGoToGame = () => {
    if (!hasValidAmountOfMinions) {
      setShowModal(true);
      return null;
    }
    dispatch(
      initBoard({
        firstPlayerUnitTemplates: firstPlayerUnits,
        secondPlayerUnitTemplates: secondPlayerUnits,
        userName: PLAYERS[0],
        opponentName: PLAYERS[1],
        backgroundSrc: combatBackgroundName,
        firstPlayerArtifactArr,
        secondPlayerArtifactArr,
      })
    );
  };

  const handlePressReady = () => {
    isFirstPlayer ? handleGoToSecondPlayer() : handleGoToGame();
  };

  const [showModal, setShowModal] = useState<boolean>(false);

  const money = useSelector((state: RootState) => state.lobby.activeUserMoney);

  return (
    <LobbyPageWrapper>
      {showModal && (
        <Modal onOutsideClick={() => setShowModal(false)}>
          <StyledModalWindow>
            The number of units must not be larger than 5 and not less than 1!
            <Button
              isOk
              onClick={() => {
                setShowModal(false);
              }}
            />
          </StyledModalWindow>
        </Modal>
      )}

      <CentralContainer>
        <div>
          <LeftContainer>
            <ArtifactsShop money={money} />
          </LeftContainer>
          <StyledMoneyContainer>
            <StyledSubTitle>
              Number of available money: {money}
              <StyledMoneyImg src={goldIcon} />
            </StyledSubTitle>
          </StyledMoneyContainer>
        </div>
        <MainPartWrapper>
          <Container>
            <TownPicture />
            <UnitsCollection
              money={money}
              units={LIST_OF_UNITS}
              totalUnits={units}
            />
          </Container>
          <UnitsContainer>
            <MyUnits
              handlePressReady={handlePressReady}
              playerName={currentPlayerName}
            />
          </UnitsContainer>
        </MainPartWrapper>
        <RightContainer>
          <BackgroundSelector
            selectedBackgroundName={combatBackgroundName}
            onSelect={changeBackgroundName}
          />
        </RightContainer>
      </CentralContainer>
    </LobbyPageWrapper>
  );
};

const CentralContainer = styled.div`
  display: flex;
  align-items: flex-start;
`;

const MainPartWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledModalWindow = styled.div`
  min-height: 80px;
  min-width: 150px;
  background: url(${leatherBackground});
  padding: 40px;
  background-color: #2d1d0f;
  border: 1px solid #ad8e42;
  border-image: url(${windowBorder}) 40 / 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

const StyledMoneyImg = styled.img`
  width: 30px;
  margin-left: 4px;
`;

const StyledSubTitle = styled.span`
  display: flex;
  align-items: center;
`;

const LobbyPageWrapper = styled.div`
  display: flex;
  background: center / cover url(${loginLobbyBackground});
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const UnitsContainer = styled(Container)`
  margin-top: 20px !important;
`;

const RightContainer = styled(Container)`
  margin-left: 20px;
  :not(:first-child) {
    margin-top: 0px;
  }
`;

const LeftContainer = styled(Container)`
  margin-right: 20px;
  :not(:first-child) {
    margin-top: 0px;
  }
`;

const StyledMoneyContainer = styled(LeftContainer)`
  margin-top: 20px !important;
`;

const StyledShopTitle = styled.span`
  font-size: 40px;
`;
export default LobbyPage;
