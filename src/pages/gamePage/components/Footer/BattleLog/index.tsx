import { FC, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { RootState } from "../../../../../store/store";

const BattleLog: FC = () => {
  const lastAction = useSelector((state: RootState) => state.game.lastAction);

  const [logOfActions, setLogOfActions] = useState<Array<string>>([]);
  useEffect(() => {
    setLogOfActions((prevState) => [...prevState, lastAction]);
  }, [lastAction]);

  return (
    <StyledBattleLog>
      {logOfActions.map((action, index) => (
        <div key={index}>{action}</div>
      ))}
    </StyledBattleLog>
  );
};

const StyledBattleLog = styled.div`
  height: 80px;
  overflow-y: auto;
  ::-webkit-scrollbar-track {
    display: none;
  }
  ::-webkit-scrollbar {
    width: 0px;
  }
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
`;

export default BattleLog;
