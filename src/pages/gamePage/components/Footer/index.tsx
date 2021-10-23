import { FC, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store/store";
import BattleLog from "./BattleLog";

const Footer: FC = () => {
  return <BattleLog />;
};

export default Footer;
