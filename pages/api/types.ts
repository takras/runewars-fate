export type Shapes =
  | "triangle"
  | "circle"
  | "rectangle"
  | "hexagon"
  | "destiny";
export type Symbols =
  | "damage"
  | "route"
  | "special"
  | "red"
  | "gold"
  | "blank"
  | Shapes;

export type CardType = "damage" | "route" | "special";

export interface Card {
  id: number;
  triangle: { type: CardType; count: number } | null;
  rectangle: { type: CardType; count: number } | null;
  hexagon: { type: CardType; count: number } | null;
  circle: { type: CardType; count: number } | null;
  destiny: { type: CardType; count: number } | null;
}

export interface Stats {
  cardsLeft: number;
  damage: number[];
  route: number[];
  special: number;
  blank: number;
  red: number;
  gold: number;
}
