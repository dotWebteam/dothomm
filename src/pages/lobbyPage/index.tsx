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

const LobbyPage: FC = () => {
  const [money, setMoney] = useState<number>(500);

  const [myUnits, setMyUnits] = useState<Array<UnitTemplateWithCount>>([]);

  const dispatch = useDispatch();

  const userName = useSelector((state: RootState) => state.user.nickname);

  const handleClick = () =>
    dispatch(
      initBoard({
        firstPlayerUnitTemplates: myUnits,
        secondPlayerUnitTemplates: myUnits,
        userName: userName,
        opponentName: "player 2",
      })
    );

  return (
    <LobbyPageWrapper>
      <LoginContainer>
        <StyledTitle>Match Lobby</StyledTitle>
        <StyledSubTitle>Number of available money: {money}</StyledSubTitle>
        <StyledShopTitle>Buy units</StyledShopTitle>
        <UnitsCollection
          units={LIST_OF_UNITS}
          setMoney={setMoney}
          setMyUnits={setMyUnits}
        />
        <StyledMyTroopsTitle>My units</StyledMyTroopsTitle>
        <MyUnits units={myUnits} setMoney={setMoney} setMyUnits={setMyUnits} />
        <Button onClick={handleClick} to="/game">
          {" "}
          Start the game!{" "}
        </Button>
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

const StyledShopTitle = styled.span`
  font-size: 40px;
`;

const StyledMyTroopsTitle = styled.span`
  font-size: 40px;
`;

export default LobbyPage;
