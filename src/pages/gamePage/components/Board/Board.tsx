import { FC, useEffect, useState } from "react";
import styled from "styled-components";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../../store/store";
import { nextTurn } from "../../boardSlice";

import Square from "./components/Square";
import { NUMBERS_OF_BOARD_ROWS, NUMBERS_OF_BOARD_COLUMNS } from "./constants";

const Board: FC = () => {
  const activeUser = useSelector((state: RootState) => state.game.activeUnit);
  const [boardState, setBoardState] = useState<any>([]);

  const getSquares = () => {
    let squaresArr = [];
    for (let y = 0; y < NUMBERS_OF_BOARD_ROWS; ++y)
      for (let x = 0; x < NUMBERS_OF_BOARD_COLUMNS; ++x) {
        squaresArr.push(<StyledSquare x={x} y={y} />);
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

  return <StyledWrapper>{boardState}</StyledWrapper>;
};

const StyledWrapper = styled.div`
  display: grid;
  width: 430px;
  grid-template-rows: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-gap: 2px;
`;

const StyledSquare = styled(Square)`
  width: 120px;
  height: 120px;
`;

export default Board;
