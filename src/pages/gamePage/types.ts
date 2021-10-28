type UnitSpecies = {
  UNDEAD:"UNDEAD";
  HUMAN: "HUMAN";
  BEAST: "BEAST";
};
type UnitTypes = {
  HERO: "SWORDSMAN";
  PEASANT: "PEASANT";
};

export type UnitType = UnitTypes[keyof UnitTypes];
export type UnitSpecie = UnitSpecies[keyof UnitSpecies];

export type DeadBodyTypes = {
  DEAD_BODY_HERO: "DEAD_BODY_SWORDSMAN";
  DEAD_BODY_PEASANT: "DEAD_BODY_PEASANT";
};

type ObstacleTypes = {
  STONES: "STONES";
};

export type DeadBodyType = DeadBodyTypes[keyof DeadBodyTypes];
export type ObstacleType = ObstacleTypes[keyof ObstacleTypes];

export type SquareState = {
  type?: string;
  id?: number;
  UnitSpecie?:UnitSpecie;  
  unitType?: UnitType;
  obstacleType?: ObstacleType;
};

export type Unit = {
  id: number;
  Tier: number;
  UnitSpecie:UnitSpecie;
  unitType: UnitType;
  coordinates: {
    x: number;
    y: number;
  };
  attack: {
    attackPower:number;
    min: number;
    max: number;
  };
  count: number;
  healthPoints: {
    max: number;
    current: number;
    defense:number;
  };
  Initiate?:{
    Initiate:number;
    Turn:number;
  }
  criticalDmg:{
    percent: number;
    chance:number;
  }
  morale:{
    morale:number;
    BattleBalance:number;
    friendlyTroops:number;
    nonFriendlyTroops:number;
  }
  actionPoints: {
    max: number;
    current: number;
  };
  isActive: boolean;
  owner: number;
  isDead: boolean;
};

export type UnitTemplate = Omit<
  Unit,
  "id" | "coordinates" | "isActive" | "owner" | "count"
> & {
  cost: number;
};

export type UnitTemplateWithCount = UnitTemplate & { count: number };

export interface BoardState {
  board: Array<Array<SquareState>>;
  units: Array<Unit>;
  activeUnit: Unit;
  deadUnits?: Array<Unit>;
  lastAction: string;
  opponentName: string;
  winner: string;
}
