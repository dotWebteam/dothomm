import { FC, useState } from "react";
import styled from "styled-components";

// assets
import attackCursor from "../../../../../pictures/cursor/attackCursor.png";
import moveCursor from "../../../../../pictures/cursor/moveCursor.png";
import castCursor from "../../../../../pictures/spellbook.png";

// redux
import { RootState } from "../../../../../store/store";
import { useSelector, useDispatch } from "react-redux";
import { attack, castSpell, moveToSquare, nextTurn } from "../../../boardSlice";

//components
import Unit from "./Unit";
import SpellEffect from "../../Spellbook/spellEffects/MagicArrow/SpellEffect";
import DamagePopup from "./DamagePopup";
import UnitInfoPopup from "./UnitInfoPopup";

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
    state.game.units.find(({ id: unitID }) => unitID === id && !obstacleType)
  );

  const deadUnitInSquare = useSelector((state: RootState) =>
    state.game.deadUnits?.find(
      ({ id: unitID }) => unitID === id && !obstacleType
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

  useTimeout(() => setShowSpellEffect(false), 300, [spellStack]);

  const [showDamagePopup, setShowDamagePopup] = useState(false);

  useTimeout(() => setShowDamagePopup(false), 300, [
    unitInSquare?.healthPoints,
  ]);

  const [showUnitInfoPopup, setShowUnitInfoPopup] = useState(false);

  if (!activeUnit) return null; // TODO: Think and remove this

  const isOwnerOfActiveUnit = currentPlayerName === activeUnit.owner;

  const {
    id: activeUserID,
    coordinates: { x: prevX, y: prevY },
    actionPoints: { current: currentActionPoints },
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

  const isEnemyInSquare =
    unitInSquare && currentPlayerName !== unitInSquare.owner;

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
      setShowDamagePopup(true);
      dispatch(nextTurn({ activeUnit }));
    }
  };

  const handleContextMenu = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    setShowUnitInfoPopup(true);
  };

  return (
    <StyledSquare
      isPossibleToMove={isPossibleToMove}
      hasActiveUnit={hasActiveUnit}
      isPossibleToAttack={isPossibleToAttack}
      isEnemyInSquare={isEnemyInSquare}
      spellIsCasting={spellIsCasting}
      className={className}
      onClick={handleClick}
      onContextMenu={handleContextMenu}
    >
      {showUnitInfoPopup && unitInSquare && (
        <UnitInfoPopup
          unit={unitInSquare}
          onHide={() => setShowUnitInfoPopup(false)}
        />
      )}
      <DamagePopup
        show={showDamagePopup}
        damage={
          unitInSquare?.healthPoints.lastTakenDamage ||
          deadUnitInSquare?.healthPoints.lastTakenDamage
        }
      />
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
  isEnemyInSquare?: boolean;
}>`
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
  border: 1px solid
    ${({ hasActiveUnit }) => (hasActiveUnit ? "#ffe98c" : "black")};
  ${({ isPossibleToMove }) =>
    isPossibleToMove && "background-color: #0000002b;"}
  ${({ hasActiveUnit }) =>
    hasActiveUnit &&
    `background: rgb(255,233,140);
    background: radial-gradient(circle, rgba(255,233,140,0.17970938375350143) 0%, rgba(74,58,38,0.5914740896358543) 100%);
  `};
  width: 50px;
  height: 50px;
  ${({ isEnemyInSquare }) =>
    isEnemyInSquare &&
    `background: rgb(215,83,83);
    background: radial-gradient(circle, rgba(215,83,83,0.17690826330532217) 0%, rgba(150,0,0,0.2637429971988795) 100%);
  `}
  :hover {
    ${({ isPossibleToAttack }) =>
      isPossibleToAttack &&
      `cursor: url(${attackCursor}), auto;
      border: 1px solid rgb(199,13,0);
      background: rgb(199,13,0);
      background: radial-gradient(circle, rgba(199,13,0,0.17970938375350143) 0%, rgba(150,0,0,0.5914740896358543) 100%);
    `}
    ${({ isPossibleToMove }) =>
      isPossibleToMove &&
      `cursor: url(${moveCursor}), auto;
      background: rgb(61,61,61);
      background: radial-gradient(circle, rgba(61,61,61,0.41220238095238093) 0%, rgba(19,19,19,0.6222864145658263) 100%);
    `};
    ${({ spellIsCasting }) =>
      spellIsCasting &&
      `cursor: url(${castCursor}), auto;
      border: 1px solid rgb(0,148,199);
      background: rgb(0,148,199);
      background: radial-gradient(circle, rgba(0,148,199,0.17970938375350143) 0%, rgba(5,0,150,0.5914740896358543) 100%);
      `};
  }
`;

export default Square;
