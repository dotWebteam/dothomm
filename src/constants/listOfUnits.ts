import { isTemplateMiddleOrTemplateTail } from "typescript";
import { UnitTemplate } from "../pages/gamePage/types";

export const SWORDSMAN: UnitTemplate = {
  Tier:3,
  UnitSpecie:"HUMAN",
  unitType: "SWORDSMAN",
  attack: {
    attackPower:9,
    min: 7,
    max: 9,
  },
  healthPoints: {
    max: 35,
    current: 35,
    defense:15,
  },
  criticalDmg:{
    percent:1.5,
    chance:0.25,
  },
  morale:{
    morale:0.5,
    BattleBalance:1,
    friendlyTroops:0,
    nonFriendlyTroops:0,
  },
  actionPoints: { max: 4, current: 4 },
  cost: 300,
  isDead: false,
};

export const PEASANT: UnitTemplate = {
  Tier:1,
  UnitSpecie:"HUMAN",
  unitType: "PEASANT",
  attack: {
    attackPower:4,
    min: 1,
    max: 2,
  },
  healthPoints: {
    max: 2,
    current: 1,
    defense:1,
  },
  criticalDmg:{
    percent:1.25,
    chance:0.1,
  },
  morale:{
    morale:0.5,
    BattleBalance:1,
    friendlyTroops:0,
    nonFriendlyTroops:0,
  },
  actionPoints: { max: 3, current: 3 },
  cost: 20,
  isDead: false,
};

const LIST_OF_UNITS = [SWORDSMAN, PEASANT];

export default LIST_OF_UNITS;
