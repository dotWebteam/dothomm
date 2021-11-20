import { FC, ReactNode, useEffect, useState } from "react";
import styled from "styled-components";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../../store/store";
import { checkForWinner, nextTurn } from "../../boardSlice";

import Square from "./components/Square";
import {
  NUMBERS_OF_BOARD_ROWS,
  NUMBERS_OF_BOARD_COLUMNS,
} from "./constants/boardConstants";
import { getBackgroundPictureByName } from "../../pictures/utils";
import Modal from "../../../../components/Modal";

import leatherBackground from "../../../../pictures/leatherBackground.png";
import windowBorder from "../../../../pictures/windowBorders.png";
import Button from "../../../../components/Button";
import UnitInfoSidebar from "../Sidebar";

import { BackgroundType } from "../../types";
import { LOBBY_PAGE_ROUTE } from "../../../../constants/routeConstants";

const Board: FC = () => {
  const activeUnit = useSelector((state: RootState) => state.game.activeUnit);
  const [boardState, setBoardState] = useState<ReactNode>([]);

  const getSquares = () => {
    const squaresArr = [];
    for (let y = 0; y < NUMBERS_OF_BOARD_ROWS; ++y)
      for (let x = 0; x < NUMBERS_OF_BOARD_COLUMNS; ++x) {
        squaresArr.push(<StyledSquare x={x} y={y} key={`${x}${y}`} />);
      }
    return squaresArr;
  };

  useEffect(() => {
    setBoardState(getSquares());
  }, []);

  const dispatch = useDispatch();

  useEffect(() => {
    if (activeUnit && !activeUnit?.actionPoints.current) {
      dispatch(nextTurn({ activeUnit: activeUnit }));
    }
  }, [activeUnit]);

  const userName = useSelector((state: RootState) => state.game.myName);

  const myUnits = useSelector((state: RootState) =>
    state.game.units.filter(({ owner }) => owner === userName)
  );

  const opponentUnits = useSelector((state: RootState) =>
    state.game.units.filter(({ owner }) => owner !== userName)
  );

  const opponentName = useSelector(
    (state: RootState) => state.game.opponentName
  );

  useEffect(() => {
    if (myUnits.length === 0 || opponentUnits.length === 0)
      dispatch(checkForWinner({ userName, opponentName }));
  }, [myUnits, opponentUnits]);

  const winner = useSelector((state: RootState) => state.game.winner);

  const backgroundSrc = useSelector(
    (state: RootState) => state.game.backgroundSrc
  );

  return (
    <StyledBoardContainer>
      {winner ? (
        <Modal>
          <StyledModalWindow>
            The winner is {winner}
            <Button isOk to={LOBBY_PAGE_ROUTE} />
          </StyledModalWindow>
        </Modal>
      ) : null}
      <StyledWrapper hasWinner={Boolean(winner)} backgroundSrc={backgroundSrc}>
        {boardState}
      </StyledWrapper>
      <UnitInfoSidebar />
    </StyledBoardContainer>
  );
};

const StyledBoardContainer = styled.div`
  display: flex;
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

const StyledWrapper = styled.div<{
  hasWinner?: boolean;
  backgroundSrc: BackgroundType;
}>`
  padding: 20px;
  border: 1px solid #ffe98c;
  background: center / cover
    url(${({ backgroundSrc }) => getBackgroundPictureByName(backgroundSrc)});
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-gap: 2px;
  ${({ hasWinner }) => hasWinner && "pointer-events: none;"}
`;

const StyledSquare = styled(Square)`
  width: 120px;
  height: 120px;
`;

export default Board;
