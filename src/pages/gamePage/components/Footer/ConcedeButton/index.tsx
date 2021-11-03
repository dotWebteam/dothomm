import { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Button from "../../../../../components/Button";
import { concede } from "../../../boardSlice";

import forbiddenIcon from "../../../../../pictures/forbidden.png";

const ConcedeButton: FC = () => {
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(concede());
  };
  return (
    <Button onClick={handleClick}>
      <img src={forbiddenIcon} />
    </Button>
  );
};

export default ConcedeButton;
