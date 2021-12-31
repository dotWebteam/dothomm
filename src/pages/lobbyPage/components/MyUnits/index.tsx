import { Dispatch, FC, SetStateAction } from "react";
import styled from "styled-components";
import Button from "../../../../components/Button";
import { UnitTemplateWithCount } from "../../../gamePage/types";

import leatherBackground from "../../../../pictures/leatherBackground.png";

import UnitComponent from "./Unit";
import { getHeroPortraitPictureByName } from "../../../gamePage/pictures/utils";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store/store";

import { PLAYERS } from "../../../../constants/players";
import { capitalize } from "lodash";
import { GAME_PAGE_ROUTE } from "../../../../constants/routeConstants";
import { getCurrentUserArmy } from "../../selectors";

interface IMyUnits {
  className?: string;
  playerName: string;
  handlePressReady: () => void;
}

const MyUnits: FC<IMyUnits> = ({ playerName, handlePressReady }) => {
  const units = useSelector(getCurrentUserArmy);
  const portraitName = playerName === PLAYERS[0] ? "ORRIN" : "ADELAIDE";
  const hasValidAmountOfMinions =
    units && units?.length > 0 && units?.length < 6;
  return (
    <StyledMyUnits>
      <UnitComponent key={0} id={0} unit={units ? units[0] : undefined} />
      <UnitComponent key={1} id={1} unit={units ? units[1] : undefined} />
      <UnitComponent key={2} id={2} unit={units ? units[2] : undefined} />
      <UnitComponent key={3} id={3} unit={units ? units[3] : undefined} />
      <UnitComponent key={4} id={4} unit={units ? units[4] : undefined} />
      <StyledImg src={getHeroPortraitPictureByName(portraitName)} />
      <StyledButton>
        {capitalize(playerName)}
        <Button
          isOk
          onClick={handlePressReady}
          to={
            playerName === PLAYERS[1] && hasValidAmountOfMinions
              ? GAME_PAGE_ROUTE
              : undefined
          }
        />
      </StyledButton>
    </StyledMyUnits>
  );
};

const StyledImg = styled.img`
  width: 60px;
  border: 1px solid #ad8e42;
`;

const StyledMyUnits = styled.div`
  display: flex;
  background: url(${leatherBackground});
  padding: 5px 5px 0 5px;
`;

const StyledButton = styled.div`
  width: 92px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 4px;
  justify-content: space-between;
`;

export default MyUnits;
