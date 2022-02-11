import { Shapes, Card, Stats, Symbols } from "./types";

export const getShapeStats = (shape: Shapes, deck: Card[]) => {
  const stats: Stats = {
    cardsLeft: deck.length,
    damage: [],
    route: [],
    special: 0,
    blank: 0,
    red: 0,
    gold: 0,
  };
  deck.forEach((card) => {
    switch (card[shape] as Symbols) {
      case "damage1":
        stats.damage.push(1);
        break;
      case "damage2":
        stats.damage.push(2);
        break;
      case "damage3":
        stats.damage.push(3);
        break;
      case "route1":
        stats.route.push(1);
        break;
      case "route2":
        stats.route.push(2);
        break;
      case "special":
        stats.special++;
        break;
      case "red":
        stats.red++;
        break;
      case "gold":
        stats.gold++;
        break;
      default:
        stats.blank++;
    }
  });
  return stats;
};

export const sum = (acc: number, curr: number) => acc + curr;

export const avg = (list: number[]) =>
  list.length === 0 ? "—" : (list.reduce(sum) / list.length).toFixed(1);

export const range = (list: number[]) => {
  if (list.length === 0) {
    return "—";
  }
  const min = Math.min(...list);
  const max = Math.max(...list);
  if (min === max) {
    return "—";
  }
  return `${min}-${max}`;
};
