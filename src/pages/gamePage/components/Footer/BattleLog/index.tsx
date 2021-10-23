import { FC, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../store/store";

const BattleLog: FC = () => {
  const lastAction = useSelector((state: RootState) => state.game.lastAction);

  const [logOfActions, setLogOfActions] = useState<Array<string>>([]);
  useEffect(() => {
    setLogOfActions((prevState) => [...prevState, lastAction]);
  }, [lastAction]);

  return (
    <div>
      {logOfActions.map((action, index) => (
        <div key={index}>{action}</div>
      ))}
    </div>
  );
};

export default BattleLog;
