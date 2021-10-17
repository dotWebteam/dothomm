export type SquareState = {
  unitName?: string;
};

export type Unit = {
  name: string;
  coordinates: {
    x: number;
    y: number;
  };
  actionPoints: {
    max: number;
    current: number;
  };
};

export interface BoardState {
  board: Array<Array<SquareState>>;
  units: Array<Unit>;
  activeUnit: Unit;
}
