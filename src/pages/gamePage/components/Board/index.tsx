import { FC, useEffect, useState } from "react";
import styled from "styled-components";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../../store/store";
import { endGame, nextTurn } from "../../boardSlice";

import Square from "./components/Square";
import {
  NUMBERS_OF_BOARD_ROWS,
  NUMBERS_OF_BOARD_COLUMNS,
} from "./constants/boardConstants";

const Board: FC = () => {
  const activeUser = useSelector((state: RootState) => state.game.activeUnit);
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

  const {
    id: activeUserID,
    coordinates: { x: prevX, y: prevY },
    actionPoints: { max, current: currentActionPoints },
  } = activeUser;

  const dispatch = useDispatch();

  useEffect(() => {
    if (!currentActionPoints) {
      dispatch(nextTurn({ activeUnit: activeUser }));
    }
  }, [activeUser]);

  const myUnits = useSelector((state: RootState) =>
    state.game.units.filter(({ owner }) => owner === state.user.nickname)
  );

  const myName = useSelector((state: RootState) => state.user.nickname);

  const opponentUnits = useSelector((state: RootState) =>
    state.game.units.filter(({ owner }) => owner !== state.user.nickname)
  );

  const opponentName = useSelector(
    (state: RootState) => state.game.opponentName
  );

  useEffect(() => {
    if (myUnits.length === 0) dispatch(endGame({ winnerName: opponentName }));
    if (opponentUnits.length === 0) dispatch(endGame({ winnerName: myName }));
  }, [myUnits, opponentUnits]);

  const winner = useSelector((state: RootState) => state.game.winner);

  return (
    <StyledWrapper hasWinner={Boolean(winner)}>{boardState}</StyledWrapper>
  );
};

const StyledWrapper = styled.div<{ hasWinner?: boolean }>`
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