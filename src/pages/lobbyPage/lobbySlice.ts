import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PLAYERS } from "../../constants/players";
import {
  Artifact,
  BackgroundType,
  UnitTemplate,
  UnitTemplateWithCount,
} from "../gamePage/types";
import { INITIAL_AMOUNT_OF_MONEY } from "./constants";

type LobbyState = {
  unitList: UnitTemplate[];
  firstArmy: UnitTemplateWithCount[];
  secondArmy: UnitTemplateWithCount[];
  firstEquip: Artifact[];
  secondEquip: Artifact[];
  users: string[];
  activeUser: string;
  maxMoney: number;
  activeUserMoney: number;
  backgroundName: BackgroundType;
};

const initialState: LobbyState = {
  unitList: [],
  firstArmy: [],
  secondArmy: [],
  firstEquip: [],
  secondEquip: [],
  users: PLAYERS,
  activeUser: PLAYERS[0],
  maxMoney: INITIAL_AMOUNT_OF_MONEY,
  activeUserMoney: INITIAL_AMOUNT_OF_MONEY,
  backgroundName: "BEACH",
};

export const lobbySlice = createSlice({
  name: "lobby",
  initialState,
  reducers: {
    addUnit: (
      state,
      action: PayloadAction<{
        unit: UnitTemplateWithCount;
      }>
    ) => {
      const { unit } = action.payload;
      state.activeUserMoney -= unit.cost * unit.count;
      state.activeUser === state.users[0]
        ? state.firstArmy.push(unit)
        : state.secondArmy.push(unit);
    },
    removeUnit: (
      state,
      action: PayloadAction<{
        unit: UnitTemplateWithCount;
        id: number;
      }>
    ) => {
      const { unit: unitToDel, id } = action.payload;
      const currentPlayerArmy =
        state.activeUser === state.users[0]
          ? state.firstArmy
          : state.secondArmy;
      currentPlayerArmy.splice(id, 1);
      state.activeUserMoney += unitToDel.cost * unitToDel.count;
      return state;
    },
    addArtifact: (
      state,
      action: PayloadAction<{
        artifact: Artifact;
      }>
    ) => {
      const { artifact } = action.payload;
      state.activeUserMoney -= artifact.cost;
      state.activeUser === state.users[0]
        ? state.firstEquip.push(artifact)
        : state.secondEquip.push(artifact);
    },
    removeArtifact: (
      state,
      action: PayloadAction<{
        artifact: Artifact;
      }>
    ) => {
      const { artifact: artifactToDel } = action.payload;
      const currentPlayerEquip =
        state.activeUser === state.users[0]
          ? state.firstEquip
          : state.secondEquip;
      currentPlayerEquip.splice(
        currentPlayerEquip.findIndex(
          (artifact) => artifact.id === artifactToDel.id
        ),
        1
      );
      state.activeUserMoney += artifactToDel.cost;
      return state;
    },
    setBackground: (
      state,
      action: PayloadAction<{
        backgroundName: BackgroundType;
      }>
    ) => {
      state.backgroundName = action.payload.backgroundName;
      return state;
    },
    goToSecondPlayer: (state) => {
      state.activeUser = state.users[1];
      state.activeUserMoney = state.maxMoney;
    },
    setInitialState: (state) => (state = initialState),
  },
});

export const {
  addUnit,
  removeUnit,
  addArtifact,
  removeArtifact,
  setBackground,
  goToSecondPlayer,
  setInitialState,
} = lobbySlice.actions;

export default lobbySlice.reducer;
