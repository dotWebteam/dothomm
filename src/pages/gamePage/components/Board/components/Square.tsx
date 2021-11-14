import { FC, useState } from "react";
import styled from "styled-components";

// assets
import attackCursor from "../../../../../pictures/cursor/attackCursor.png";
import moveCursor from "../../../../../pictures/cursor/moveCursor.png";
import castCursor from "../../../../../pictures/spellbook.png";

// redux
import { RootState } from "../../../../../store/store";
import { useSelector, useDispatch } from "react-redux";
import { attack, castSpell, moveToSquare } from "../../../boardSlice";

//components
import Unit from "./Unit";
import SpellEffect from "../../Spellbook/spellEffects/MagicArrow/SpellEffect";

// utils
import { isAdjacentCoordinateWithActionPoints } from "../utils/movingUtils";
import Obstacle from "./Obstacle";
import DeadBody from "./DeadBody";
import { useTimeout } from "../../../../../utils/useTimeout";

interface ISquare {
  x: number;
  y: number;
  className?: string;
}

const Square: FC<ISquare> = ({ x, y, className }) => {
  const squareState = useSelector((state: RootState) => state.game.board[y][x]);
  const {
    type: squareFillType,
    id,
    unitType,
    obstacleType,
    deadBodyType,
  } = squareState;

  const unitInSquare = useSelector((state: RootState) =>
    state.game.units.find(
      ({ id: unitID }) => unitID === id && !obstacleType && !deadBodyType
    )
  );

  const hasObstacle = squareFillType === "obstacle" && obstacleType;
  const hasUnit = squareFillType === "unit" && unitType;
  const hasDeadBody = squareFillType === "deadBody" && deadBodyType;
  const isFreeSquare = !hasObstacle && !hasUnit;

  const activeUnit = useSelector((state: RootState) => state.game.activeUnit);

  const dispatch = useDispatch();

  const currentPlayerName = useSelector(
    (state: RootState) => state.game.myName
  );

  const spellStack = useSelector((state: RootState) => state.game.spellStack);

  const [showSpellEffect, setShowSpellEffect] = useState(false);

  useTimeout(() => setShowSpellEffect(false), 1000, [spellStack]);

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

  const { isCasting: spellIsCasting, effectSrc } = spellStack;

  const handleClick = () => {
    if (spellIsCasting) {
      dispatch(castSpell({ x, y }));
      setShowSpellEffect(true);
      return null;
    }
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
      spellIsCasting={spellIsCasting}
      className={className}
      onClick={handleClick}
    >
      <SpellEffect
        show={Boolean(showSpellEffect && effectSrc)}
        imgSrc={effectSrc}
      />
      {hasUnit && (
        <Unit
          unitType={unitType}
          healthPoints={unitInSquare?.healthPoints}
          actionPoints={hasActiveUnit ? currentActionPoints : undefined}
          count={unitInSquare?.count}
          viewDirection={unitInSquare?.viewDirection}
        />
      )}
      {hasObstacle && <Obstacle obstacleType={obstacleType} />}
      {hasDeadBody && <DeadBody deadBodyType={deadBodyType} />}
    </StyledSquare>
  );
};

const StyledSquare = styled.div<{
  isPossibleToMove?: boolean;
  hasActiveUnit?: boolean;
  isPossibleToAttack?: boolean;
  spellIsCasting?: boolean;
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
    ${({ spellIsCasting }) =>
      spellIsCasting && `cursor: url(${castCursor}), auto;`};
  }
`;

export default Square;
