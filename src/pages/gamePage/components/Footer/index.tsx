import { FC, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store/store";
import BattleLog from "./BattleLog";
import SkipTurn from "./WaitButton";

const Footer: FC = () => {
  return (
    <>
      <BattleLog />
      <SkipTurn />
    </>
  );
};

export default Footer;
