import { FC } from "react";
import styled from "styled-components";

import { RootState } from "../../../../../store/store";
import { useSelector, useDispatch } from "react-redux";
import { moveToSquare } from "../../../../../store/boardSlice";

interface ISquare {
  x: number;
  y: number;
  className?: string;
}

const Square: FC<ISquare> = ({ x, y, className }) => {
  const squareState = useSelector(
    (state: RootState) => state.board.board[y][x]
  );
  const { unitName } = squareState;

  const activeUser = useSelector((state: RootState) => state.board.activeUnit);

  const {
    name: activeUsername,
    coordinates: { x: prevX, y: prevY },
  } = activeUser;

  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(
      moveToSquare({
        prevX,
        prevY,
        nextX: x,
        nextY: y,
        username: activeUsername,
      })
    );
  };

  return (
    <StyledSquare className={className} onClick={handleClick}>
      x:{x}y:{y}
      {unitName}
    </StyledSquare>
  );
};

const StyledSquare = styled.div`
  border: 1px solid black;
  width: 50px;
  height: 50px;
  :hover {
    background-color: Gainsboro;
  }
`;

export default Square;
