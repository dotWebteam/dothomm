import { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Button from "../../../../../components/Button";
import { RootState } from "../../../../../store/store";
import { nextTurn } from "../../../boardSlice";
import clockIcon from "../../../../../pictures/clock.png";

const SkipTurnButton: FC = () => {
  const activeUnit = useSelector((state: RootState) => state.game.activeUnit);
  const dispatch = useDispatch();
  const handleClick = () => {
    activeUnit && dispatch(nextTurn({ activeUnit }));
  };
  return (
    <Button onClick={handleClick}>
      <img src={clockIcon} />
    </Button>
  );
};

export default SkipTurnButton;
