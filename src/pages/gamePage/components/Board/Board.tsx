import { FC, useEffect, useState } from "react";
import styled from "styled-components";

import Square from "./components/Square";

import { getUnitInSquare } from "./utils";

const NUMBERS_OF_ROWS = 5;
const NUMBERS_OF_COLUMNS = 8;

const Board: FC = () => {
  const [boardState, setBoardState] = useState<any>([]);

  const initBoard = () => {};

  const getSquares = () => {
    let squaresArr = [];
    for (let y = 0; y < NUMBERS_OF_ROWS; ++y)
      for (let x = 0; x < NUMBERS_OF_COLUMNS; ++x) {
        squaresArr.push(<StyledSquare x={x} y={y} />);
      }
    return squaresArr;
  };

  useEffect(() => {
    setBoardState(getSquares());
  }, []);

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
