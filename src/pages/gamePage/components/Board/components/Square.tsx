import { FC, useEffect } from "react";
import styled from "styled-components";
import { isEmpty } from "lodash";

// redux
import { RootState } from "../../../../../store/store";
import { useSelector, useDispatch } from "react-redux";
import { moveToSquare } from "../../../boardSlice";

//components
import Unit from "./Unit";

// utils
import { isAdjacentCoordinateWithActionPoints } from "../utils";
import Obstacle from "./Obstacle";

interface ISquare {
  x: number;
  y: number;
  className?: string;
}

const Square: FC<ISquare> = ({ x, y, className }) => {
  const squareState = useSelector((state: RootState) => state.game.board[y][x]);
  const { type: squareFillType, id, unitType } = squareState;

  const hasObstacle = squareFillType === "obstacle";
  const hasUnit = squareFillType === "unit" && unitType;
  const isFreeSquare = !hasObstacle && !hasUnit;

  const activeUser = useSelector((state: RootState) => state.game.activeUnit);

  const {
    id: activeUserID,
    name: activeUsername,
    coordinates: { x: prevX, y: prevY },
    actionPoints: { max, current: currentActionPoints },
    isOwner,
  } = activeUser;

  const dispatch = useDispatch();

  const isPossibleToMove =
    isAdjacentCoordinateWithActionPoints(
      prevX,
      prevY,
      x,
      y,
      currentActionPoints
    ) &&
    isFreeSquare &&
    isOwner;

  const handleClick = () => {
    if (isPossibleToMove)
      dispatch(
        moveToSquare({
          prevX,
          prevY,
          nextX: x,
          nextY: y,
          id: activeUserID,
        })
      );
  };

  return (
    <StyledSquare
      isHighlighted={isPossibleToMove}
      className={className}
      onClick={handleClick}
    >
      {hasUnit && <Unit unitType={unitType} />}
      {hasObstacle && <Obstacle id={1} />}
    </StyledSquare>
  );
};

const StyledSquare = styled.div<{ isHighlighted?: boolean }>`
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
  border: 1px solid black;
  ${({ isHighlighted }) => isHighlighted && "background-color: LightGreen;"}
  width: 50px;
  height: 50px;
  :hover {
    background-color: Gainsboro;
  }
`;

export default Square;
