type UnitTypes = {
  HERO: "SWORDSMAN";
  PEASANT: "PEASANT";
};

export type UnitType = UnitTypes[keyof UnitTypes];

export type DeadBodyTypes = {
  DEAD_BODY_HERO: "DEAD_BODY_SWORDSMAN";
  DEAD_BODY_PEASANT: "DEAD_BODY_PEASANT";
};

type ObstacleTypes = DeadBodyTypes & {
  STONES: "STONES";
};

export type DeadBodyType = DeadBodyTypes[keyof DeadBodyTypes];
export type ObstacleType = ObstacleTypes[keyof ObstacleTypes];

export type SquareState = {
  type?: string;
  id?: number;
  unitType?: UnitType;
  obstacleType?: ObstacleType;
};

export type Unit = {
  id: number;
  unitType: UnitType;
  coordinates: {
    x: number;
    y: number;
  };
  attack: {
    min: number;
    max: number;
  };
  count: number;
  healthPoints: {
    max: number;
    current: number;
  };
  actionPoints: {
    max: number;
    current: number;
  };
  isActive: boolean;
  owner: string;
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
  activeUnit?: Unit;
  deadUnits?: Array<Unit>;
  lastAction: string;
  myName: string;
  opponentName: string;
  winner: string;
  isOnline: boolean;
}

export type BackgroundTypes = {
  BEACH: "BEACH";
  BOAT: "BOAT";
};

export type BackgroundType = BackgroundTypes[keyof BackgroundTypes];
