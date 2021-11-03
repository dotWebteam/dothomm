import { FC, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store/store";
import BattleLog from "./BattleLog";
import ConcedeButton from "./ConcedeButton";
import SkipTurnButton from "./SkipTurnButton";

const Footer: FC = () => {
  return (
    <>
      <BattleLog />
      <SkipTurnButton />
      <ConcedeButton />
    </>
  );
};

export default Footer;
