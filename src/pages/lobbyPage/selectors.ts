import { RootState } from "../../store/store";

export const getIsFirstPlayerActive = (state: RootState) =>
  state.lobby.activeUser === state.lobby.users[0];

export const getCurrentPlayerName = (state: RootState) =>
  state.lobby.users[getIsFirstPlayerActive(state) ? 0 : 1];

export const getCurrentUserArmy = (state: RootState) =>
  getIsFirstPlayerActive(state)
    ? state.lobby.firstArmy
    : state.lobby.secondArmy;

export const getCurrentUserEquip = (state: RootState) =>
  getIsFirstPlayerActive(state)
    ? state.lobby.firstEquip
    : state.lobby.secondEquip;
