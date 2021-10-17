import { FC } from "react";
import styled from "styled-components";

import { RootState } from "../../../../../store/store";
import { useSelector, useDispatch } from "react-redux";
import { moveToSquare } from "../../../boardSlice";

import { isAdjacentCoordinateWithActionPoints } from "../utils";

interface ISquare {
  x: number;
  y: number;
  className?: string;
}

const Square: FC<ISquare> = ({ x, y, className }) => {
  const squareState = useSelector((state: RootState) => state.game.board[y][x]);
  const { unitName } = squareState;

  const activeUser = useSelector((state: RootState) => state.game.activeUnit);

  const {
    name: activeUsername,
    coordinates: { x: prevX, y: prevY },
    actionPoints: { max, current },
  } = activeUser;

  const dispatch = useDispatch();

  const isPossibleToMove = isAdjacentCoordinateWithActionPoints(
    prevX,
    prevY,
    x,
    y,
    current
  );

  const handleClick = () => {
    if (isPossibleToMove)
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
    <StyledSquare
      isHighlighted={isPossibleToMove}
      className={className}
      onClick={handleClick}
    >
      x:{x}y:{y}
      {unitName}
    </StyledSquare>
  );
};

const StyledSquare = styled.div<{ isHighlighted?: boolean }>`
  border: 1px solid black;
  ${({ isHighlighted }) => isHighlighted && "background-color: LightGreen;"}
  width: 50px;
  height: 50px;
  :hover {
    background-color: Gainsboro;
  }
`;

export default Square;
