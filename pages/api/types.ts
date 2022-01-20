export type Shapes =
  | "triangle"
  | "circle"
  | "rectangle"
  | "hexagon"
  | "destiny";
export type Symbols =
  | "damage"
  | "damage1"
  | "damage2"
  | "damage3"
  | "route"
  | "route1"
  | "route2"
  | "special"
  | "red"
  | "gold"
  | "blank"
  | Shapes;

export interface Card {
  id: number;
  triangle: string | null;
  rectangle: string | null;
  hexagon: string | null;
  circle: string | null;
  destiny: string | null;
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
