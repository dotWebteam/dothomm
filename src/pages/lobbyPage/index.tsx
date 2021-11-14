import { FC, useState } from "react";
import styled from "styled-components";

import Button from "../../components/Button";

import UnitsCollection from "./components/UnitsCollection";

import { useDispatch, useSelector } from "react-redux";
import { initBoard } from "../gamePage/boardSlice";
import { RootState } from "../../store/store";

import loginLobbyBackground from "../../pictures/loginLobbyBackground.png";
import leatherBackground from "../../pictures/leatherBackground.png";
import windowBorder from "../../pictures/windowBorders.png";

import LIST_OF_UNITS from "../../constants/listOfUnits";
import { UnitTemplateWithCount } from "../gamePage/types";
import MyUnits from "./components/MyUnits";

import goldIcon from "../../pictures/gold.png";
import { PLAYERS } from "../../constants/players";
import { INITIAL_AMOUNT_OF_MONEY } from "./constants";
import Modal from "../../components/Modal";

const LobbyPage: FC = () => {
  const [money, setMoney] = useState<number>(INITIAL_AMOUNT_OF_MONEY);

  const [currentPlayerName, setCurrentPlayerName] = useState<string>(
    PLAYERS[0]
  );

  const [firstPlayerUnits, setFirstPlayerUnits] = useState<
    Array<UnitTemplateWithCount>
  >([]);
  const [secondPlayerUnits, setSecondPlayerUnits] = useState<
    Array<UnitTemplateWithCount>
  >([]);

  const isFirstPlayer = currentPlayerName === PLAYERS[0];

  const units = isFirstPlayer ? firstPlayerUnits : secondPlayerUnits;

  const hasValidAmountOfMinions = units.length > 0 && units.length < 6;

  const setUnits = isFirstPlayer ? setFirstPlayerUnits : setSecondPlayerUnits;

  const dispatch = useDispatch();

  const goToSecondPlayer = () => {
    if (!hasValidAmountOfMinions) {
      setShowModal(true);
      return null;
    }
    setCurrentPlayerName(PLAYERS[1]);
    setMoney(INITIAL_AMOUNT_OF_MONEY);
  };

  const goToGame = () => {
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
      })
    );
  };

  const handlePressReady = () => {
    isFirstPlayer ? goToSecondPlayer() : goToGame();
  };

  const [showModal, setShowModal] = useState<boolean>(false);

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
      <Container>
        <StyledShopTitle>Buy units</StyledShopTitle>
        <StyledSubTitle>
          Number of available money: {money} <StyledMoneyImg src={goldIcon} />
        </StyledSubTitle>
        <UnitsCollection
          money={money}
          units={LIST_OF_UNITS}
          setMoney={setMoney}
          setMyUnits={setUnits}
          totalUnits={units}
        />
      </Container>
      <Container>
        <MyUnits
          units={units}
          setMoney={setMoney}
          setMyUnits={setUnits}
          handlePressReady={handlePressReady}
          playerName={currentPlayerName}
        />
      </Container>
    </LobbyPageWrapper>
  );
};

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
  flex-direction: column;
  background: center / cover url(${loginLobbyBackground});
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
  background: url(${leatherBackground});
  padding: 40px;
  background-color: #2d1d0f;
  border: 1px solid #ad8e42;
  border-image: url(${windowBorder}) 40 / 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  :last-child {
    margin-top: 16px;
  }
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

const StyledShopTitle = styled.span`
  font-size: 40px;
`;

const StyledMyTroopsTitle = styled.span`
  font-size: 40px;
`;

export default LobbyPage;
