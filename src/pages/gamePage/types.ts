type UnitTypes = {
  HERO: "SWORDSMAN";
  PEASANT: "PEASANT";
  PIKEMAN: "PIKEMAN";
};

export type UnitType = UnitTypes[keyof UnitTypes];

export type DeadBodyTypes = {
  DEAD_BODY_HERO: "DEAD_BODY_SWORDSMAN";
  DEAD_BODY_PEASANT: "DEAD_BODY_PEASANT";
  DEAD_BODY_PIKEMAN: "DEAD_BODY_PIKEMAN";
};

type ObstacleTypes = {
  STONES: "STONES";
};

export type DeadBodyType = DeadBodyTypes[keyof DeadBodyTypes];
export type ObstacleType = ObstacleTypes[keyof ObstacleTypes];

export type SquareState = {
  type?: string;
  id?: number;
  unitType?: UnitType;
  obstacleType?: ObstacleType;
  deadBodyType?: DeadBodyType;
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
  defense: number;
  count: number;
  healthPoints: {
    lastTakenDamage?: number;
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
  viewDirection: string; // TODO: union instead of string - troubles in initializeUtils
};

export type UnitTemplate = Omit<
  Unit,
  "id" | "coordinates" | "isActive" | "owner" | "count" | "viewDirection"
> & {
  cost: number;
};

export type UnitTemplateWithCount = UnitTemplate & { count: number };

export type BackgroundTypes = {
  BEACH: "BEACH";
  BOAT: "BOAT";
  CLEVER_FIELD: "CLEVER_FIELD";
  DESERT: "DESERT";
  GREEN_MOUNTAINS: "GREEN_MOUNTAINS";
  GREEN_TREES: "GREEN_TREES";
  LAVA: "LAVA";
  SWAMP: "SWAMP";
  WASTELAND: "WASTELAND";
};

export type BackgroundType = BackgroundTypes[keyof BackgroundTypes];

export type HeroesTypes = {
  ORRIN: "ORRIN";
  ADELAIDE: "ADELAIDE";
};

export type HeroType = HeroesTypes[keyof HeroesTypes];

export type SpellNames = {
  MAGIC_ARROW: "Magic Arrow";
};

export type SpellName = SpellNames[keyof SpellNames];

export type Spell = {
  id: number;
  name: SpellName;
  iconSrc: string; // new approach to get icons, probably also try it with other icons
  effectSrc: string;
  cost: number;
};

export type SpellStack = {
  isCasting: boolean;
  spellName?: SpellName;
  cost: number;
  effectSrc: string;
};

export type SpellPoints = {
  isTired: boolean;
  max: number;
  current: number;
};

export type Rarity = "COMMON" | "RARE" | "EPIC";

export type ArtifactNames = {
  HELM_OF_ALABASTER_UNICORN: "HELM_OF_ALABASTER_UNICORN";
  CENTAURS_AXE: "CENTAURS_AXE";
  RING_OF_VITALITY: "RING_OF_VITALITY";
  SHIELD_OF_DWARWEN_LORDS: "SHIELD_OF_DWARWEN_LORDS";
};

export type ArtifactName = ArtifactNames[keyof ArtifactNames];

export type Artifact = {
  id: number;
  name: ArtifactName;
  humanReadableName: string;
  iconSrc: string;
  cost: number;
  description: string;
  rarity: Rarity;
};

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
  spellStack: SpellStack;
  turn: number;
  spellPoints: SpellPoints;
  opponentSpellPoints: SpellPoints;
  backgroundSrc: BackgroundType;
}

export type BoardAndUnitsState = {
  spellName: SpellName;
  board: Array<Array<SquareState>>;
  units: Array<Unit>;
  deadUnits?: Array<Unit>;
  lastAction: string;
  target: { x: number; y: number };
};
