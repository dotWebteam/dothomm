import { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Button from "../../../../../components/Button";
import { concede } from "../../../boardSlice";

const ConcedeButton: FC = () => {
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(concede());
  };
  return <Button onClick={handleClick}>Concede</Button>;
};

export default ConcedeButton;
