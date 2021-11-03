import { FC, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { RootState } from "../../../../../store/store";

const BattleLog: FC = () => {
  const lastAction = useSelector((state: RootState) => state.game.lastAction);

  const [logOfActions, setLogOfActions] = useState<Array<string>>([]);
  useEffect(() => {
    setLogOfActions((prevState) => [...prevState, lastAction]);
  }, [lastAction]);

  useEffect(() => {
    scrollToBottom();
  }, [logOfActions]);

  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <StyledBattleLog>
      {logOfActions.map((action, index) => (
        <div key={index}>{action}</div>
      ))}
      <div ref={messagesEndRef} />
    </StyledBattleLog>
  );
};

const StyledBattleLog = styled.div`
  flex: 2;
  background: #00000057;
  padding: 10px;
  height: 28px;
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
