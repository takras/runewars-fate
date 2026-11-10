export type Shapes = "triangle" | "circle" | "rectangle" | "hexagon";

export type Symbols =
  | "damage"
  | "route"
  | "special"
  | "red"
  | "gold"
  | "blank"
  | Shapes;

export type CardType = "damage" | "route" | "special";

export type DestinyType = "gold" | "red" | "grey";

export interface Card {
  id: number;
  triangle: { type: CardType; count: number } | null;
  rectangle: { type: CardType; count: number } | null;
  hexagon: { type: CardType; count: number } | null;
  circle: { type: CardType; count: number } | null;
  destiny: DestinyType;
}

export interface Stats {
  cardsLeft: number;
  damage: number[];
  route: number[];
  special: number;
}

export interface DestinyStats {
  cardsLeft: number;
  gold: number;
  red: number;
  grey: number;
}
