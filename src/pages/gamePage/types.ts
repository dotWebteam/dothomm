type unitTypes = {
  HERO: "HERO";
  PEASANT: "PEASANT";
};

export type UnitType = unitTypes[keyof unitTypes];

export type SquareState = {
  type?: string;
  id?: number;
  unitType?: UnitType;
};

export type Unit = {
  id: number;
  name: string;
  coordinates: {
    x: number;
    y: number;
  };
  attack: number;
  healthPoints: {
    max: number;
    current: number;
  };
  actionPoints: {
    max: number;
    current: number;
  };
  isActive: boolean;
  isOwner: boolean;
  isDead: boolean;
};

export interface BoardState {
  board: Array<Array<SquareState>>;
  units: Array<Unit>;
  activeUnit: Unit;
}
