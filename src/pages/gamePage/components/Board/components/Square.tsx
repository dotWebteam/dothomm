import { FC, useEffect } from "react";
import styled from "styled-components";
import { isEmpty } from "lodash";

// redux
import { RootState } from "../../../../../store/store";
import { useSelector, useDispatch } from "react-redux";
import { attack, moveToSquare } from "../../../boardSlice";

//components
import Unit from "./Unit";

// utils
import { isAdjacentCoordinateWithActionPoints } from "../utils/movingUtils";
import Obstacle from "./Obstacle";

interface ISquare {
  x: number;
  y: number;
  className?: string;
}

const Square: FC<ISquare> = ({ x, y, className }) => {
  const squareState = useSelector((state: RootState) => state.game.board[y][x]);
  const { type: squareFillType, id, unitType } = squareState;

  const unitInSquare = useSelector((state: RootState) =>
    state.game.units.find(({ id: unitID }) => unitID === id)
  );

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

  const hasActiveUnit = prevX === x && prevY === y;

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

  const isPossibleToAttack =
    unitInSquare && !unitInSquare.isOwner && currentActionPoints > 0;

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
    if (isPossibleToAttack) {
      dispatch(attack({ attacker: activeUser, defender: unitInSquare }));
    }
  };

  return (
    <StyledSquare
      isHighlighted={isPossibleToMove}
      hasActiveUnit={hasActiveUnit}
      className={className}
      onClick={handleClick}
    >
      {hasUnit && (
        <Unit
          unitType={unitType}
          healthPoints={unitInSquare?.healthPoints.current}
          actionPoints={hasActiveUnit ? currentActionPoints : undefined}
        />
      )}
      {hasObstacle && <Obstacle id={1} />}
    </StyledSquare>
  );
};

const StyledSquare = styled.div<{
  isHighlighted?: boolean;
  hasActiveUnit?: boolean;
}>`
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
  border: 1px solid ${({ hasActiveUnit }) => (hasActiveUnit ? "red" : "black")};
  ${({ isHighlighted }) => isHighlighted && "background-color: LightGreen;"}
  width: 50px;
  height: 50px;
  :hover {
    background-color: Gainsboro;
  }
`;

export default Square;
