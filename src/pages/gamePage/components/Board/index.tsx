import { FC, useEffect, useState } from "react";
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

const Board: FC = () => {
  const activeUnit = useSelector((state: RootState) => state.game.activeUnit);
  const [boardState, setBoardState] = useState<any>([]);

  const getSquares = () => {
    let squaresArr = [];
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

  return (
    <>
      {winner ? (
        <Modal>
          <StyledModalWindow>
            The winner is {winner}
            <Button isOk to="/lobby" />
          </StyledModalWindow>
        </Modal>
      ) : null}
      <StyledWrapper hasWinner={Boolean(winner)}>{boardState}</StyledWrapper>
    </>
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

const StyledWrapper = styled.div<{ hasWinner?: boolean }>`
  background: center / cover url(${getBackgroundPictureByName("BEACH")});
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
