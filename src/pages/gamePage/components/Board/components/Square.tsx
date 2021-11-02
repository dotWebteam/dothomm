import { FC } from "react";
import styled from "styled-components";

// assets
import attackCursor from "../../../../../pictures/cursor/attackCursor.png";
import moveCursor from "../../../../../pictures/cursor/moveCursor.png";

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
  const { type: squareFillType, id, unitType, obstacleType } = squareState;

  const unitInSquare = useSelector((state: RootState) =>
    state.game.units.find(({ id: unitID }) => unitID === id)
  );

  const hasObstacle = squareFillType === "obstacle" && obstacleType;
  const hasUnit = squareFillType === "unit" && unitType;
  const isFreeSquare = !hasObstacle && !hasUnit;

  const activeUnit = useSelector((state: RootState) => state.game.activeUnit);

  const dispatch = useDispatch();

  const currentPlayerName = useSelector(
    (state: RootState) => state.game.myName
  );

  if (!activeUnit) return null; // TODO: Think and remove this

  const isOwnerOfActiveUnit = currentPlayerName === activeUnit.owner;

  const {
    id: activeUserID,
    coordinates: { x: prevX, y: prevY },
    actionPoints: { max, current: currentActionPoints },
  } = activeUnit;

  const hasActiveUnit = prevX === x && prevY === y;

  const isReachable = isAdjacentCoordinateWithActionPoints(
    prevX,
    prevY,
    x,
    y,
    currentActionPoints
  );

  const isPossibleToMove = isReachable && isFreeSquare && isOwnerOfActiveUnit;

  const isNear = isAdjacentCoordinateWithActionPoints(prevX, prevY, x, y, 1);

  const isPossibleToAttack =
    isNear &&
    unitInSquare &&
    unitInSquare.owner !== activeUnit.owner &&
    currentActionPoints > 0 &&
    isOwnerOfActiveUnit;

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
      dispatch(attack({ attacker: activeUnit, defender: unitInSquare }));
    }
  };

  return (
    <StyledSquare
      isPossibleToMove={isPossibleToMove}
      hasActiveUnit={hasActiveUnit}
      isPossibleToAttack={isPossibleToAttack}
      className={className}
      onClick={handleClick}
    >
      {isPossibleToMove}
      {Boolean(isOwnerOfActiveUnit)}
      {hasUnit && (
        <Unit
          unitType={unitType}
          healthPoints={unitInSquare?.healthPoints.current}
          actionPoints={hasActiveUnit ? currentActionPoints : undefined}
          count={unitInSquare?.count}
        />
      )}
      {hasObstacle && <Obstacle obstacleType={obstacleType} />}
    </StyledSquare>
  );
};

const StyledSquare = styled.div<{
  isPossibleToMove?: boolean;
  hasActiveUnit?: boolean;
  isPossibleToAttack?: boolean;
}>`
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
  border: 1px solid ${({ hasActiveUnit }) => (hasActiveUnit ? "red" : "black")};
  ${({ isPossibleToMove }) =>
    isPossibleToMove && "background-color: #90ee9026;"}
  width: 50px;
  height: 50px;
  :hover {
    border: 1px solid red;
    ${({ isPossibleToAttack }) =>
      isPossibleToAttack && `cursor: url(${attackCursor}), auto;`}
    ${({ isPossibleToMove }) =>
      isPossibleToMove && `cursor: url(${moveCursor}), auto;`};
  }
`;

export default Square;
