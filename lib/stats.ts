import { Shapes, Card, Stats, Symbols, DestinyStats } from "./types";

export const getShapeStats = (shape: Shapes, deck: Card[]) => {
  const stats: Stats = {
    cardsLeft: deck.length,
    damage: [],
    route: [],
    special: 0,
  };

  deck.forEach((card) => {
    const cardShape = card[shape];
    if (cardShape) {
      switch (cardShape.type as Symbols) {
        case "damage":
          stats.damage.push(cardShape.count);
          break;
        case "route":
          stats.route.push(cardShape.count);
          break;
        case "special":
          stats.special++;
          break;
      }
    }
  });

  return stats;
};

export const getDestinyStats = (deck: Card[]) => {
  const stats: DestinyStats = {
    cardsLeft: deck.length,
    gold: 0,
    red: 0,
    grey: 0,
  };

  deck.forEach((card) => {
    const cardDestiny = card.destiny;
    switch (cardDestiny) {
      case "gold":
        stats.gold++;
        break;
      case "red":
        stats.red++;
        break;
      case "grey":
        stats.grey++;
        break;
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
