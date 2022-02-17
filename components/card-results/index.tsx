import hash from "hash-sum";

import { Card, CardType, DestinyType, Shapes } from "../../pages/api/types";
import ShapeResults from "../shape-results";
import styles from "./index.module.css";

const getShapeResults = (cardsDrawn: Card[], shape: Shapes) => {
  const shapeCards = cardsDrawn.filter((card) => card[shape]);
  const counts: Record<CardType, number> = {
    route: 0,
    damage: 0,
    special: 0,
  };

  shapeCards.forEach((card) => {
    // guaranteed not undefined by filter above
    const cardType = card[shape]!.type;
    const shapeCount = card[shape]!.count;
    counts[cardType] += shapeCount;
  });

  return counts;
};

const getDestinyResult: (cardsDrawn: Card[]) => DestinyType = (cardsDrawn) => {
  if (cardsDrawn.some((card) => card.destiny === "gold")) {
    return "gold";
  }

  if (cardsDrawn.some((card) => card.destiny === "grey")) {
    return "grey";
  }

  return "red";
};

const CardResults = ({ cardsDrawn }: { cardsDrawn: Card[] }) => {
  // Generate unique key to force a re-render by React; triggering the CSS animation for the card
  const keyFromValues = hash(cardsDrawn);
  const cardCount = cardsDrawn.length;
  const destinyResult = getDestinyResult(cardsDrawn);

  return (
    <section key={keyFromValues} className={styles.cardResults}>
      <h2 className="sr-only">Results</h2>
      <div
        className={`${styles.destiny} ${styles[`destiny--${destinyResult}`]}`}
      >
        <span className="sr-only">Destiny: {destinyResult}</span>
      </div>
      <ShapeResults
        results={getShapeResults(cardsDrawn, "triangle")}
        shape="triangle"
      />
      <ShapeResults
        results={getShapeResults(cardsDrawn, "rectangle")}
        shape="rectangle"
      />
      <ShapeResults
        results={getShapeResults(cardsDrawn, "hexagon")}
        shape="hexagon"
      />
      <ShapeResults
        results={getShapeResults(cardsDrawn, "circle")}
        shape="circle"
      />
      <div className={styles.summary}>
        <div>Drew</div>
        <output>{cardCount}</output>
        <div>{cardCount > 1 ? "cards" : "card"}</div>
      </div>
    </section>
  );
};

export default CardResults;
