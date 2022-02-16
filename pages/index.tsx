import { useState } from "react";
import Cards from "./api/cards.json";
import { NextPage } from "next";
import { Icon } from "./api/image";
import { Card, CardType, Shapes, Stats, Symbols } from "./api/types";
import Head from "next/head";
import { cumulativeHypergeometric } from "./api/hypergeometric";

import styles from "./index.module.css";
import NumberSpinner from "../components/number-spinner";
import Button from "../components/button";
import DestinyStats from "../components/destiny-stats";
import StatsTable from "../components/stats-table";
import ShapeResults from "../components/shape-results";
import CardResults from "../components/card-results";

const Draw: NextPage = () => {
  const [initialCards] = useState(Cards.cards as Card[]);
  const [deck, setDeck] = useState([...initialCards]);
  const [drawnCards, setDrawnCards] = useState<Card[]>([]);
  const [, setCurrentCard] = useState<Card>();
  const [cardsToDraw, setCardsToDraw] = useState(1);

  const drawCard = () => {
    setDrawnCards([]);
    const cardList = [];
    let deckClone = [...deck];
    for (let i = 0; i < cardsToDraw; i++) {
      const random = Math.floor(Math.random() * deckClone.length);
      const drawnCard = deckClone[random];
      deckClone.splice(random, 1);
      if (deckClone.length === 0) {
        deckClone = [...initialCards];
      }
      cardList.push(drawnCard);
    }
    setDeck(deckClone);
    setDrawnCards(cardList);
    setCurrentCard(cardList[cardList.length - 1]);
    setCardsToDraw(1);
  };

  const resetDeck = () => {
    setDrawnCards([]);
    setDeck(initialCards);
    setCurrentCard(undefined);
  };

  const getResult = (shape: Shapes) => {
    return drawnCards
      .filter((card) => card[shape])
      .sort((card1, card2) => {
        const a = card1[shape]?.type || "";
        const b = card2[shape]?.type || "";
        if (a < b) {
          return -1;
        }
        if (a > b) {
          return 1;
        }
        return 1;
      })
      .map((result, idx) => {
        return result[shape] ? (
          <Icon
            key={idx}
            className={styles.resultIcon}
            symbol={result[shape]?.type as Symbols}
            times={result[shape]?.count}
          />
        ) : null;
      });
  };

  const getShapeResult = (shape: Shapes) => {
    const shapeCards = drawnCards.filter((card) => card[shape]);
    const counts = new Map<CardType, number>();

    shapeCards.forEach((card) => {
      // guaranteed not undefined by filter above
      const cardType = card[shape]!.type;
      const shapeCount = card[shape]!.count;
      counts.set(cardType, shapeCount + (counts.get(cardType) || 0));
    });

    return counts;
  };

  const getShapeResults = (shape: Shapes) => {
    const shapeCards = drawnCards.filter((card) => card[shape]);
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

  const Results = () => {
    return (
      <>
        <CardResults
          triangle={getShapeResults("triangle")}
          rectangle={getShapeResults("rectangle")}
          hexagon={getShapeResults("hexagon")}
          circle={getShapeResults("circle")}
        />
        <table className={styles.resultTable}>
          <thead>
            <tr>
              <th colSpan={1}>Results:</th>
              <th>
                {drawnCards.length > 0 &&
                  `Drew ${drawnCards.length} card${
                    drawnCards.length !== 1 ? "s" : ""
                  }`}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <Icon symbol="triangle" />
              </td>
              <td>{getResult("triangle")}</td>
            </tr>
            <tr>
              <td>
                <Icon symbol="circle" />
              </td>
              <td>{getResult("circle")}</td>
            </tr>
            <tr>
              <td>
                <Icon symbol="rectangle" />
              </td>
              <td>{getResult("rectangle")}</td>
            </tr>
            <tr>
              <td>
                <Icon symbol="hexagon" />
              </td>
              <td>{getResult("hexagon")}</td>
            </tr>
            <tr>
              <td>Destiny:</td>
              <td>{getResult("destiny")}</td>
            </tr>
          </tbody>
        </table>
      </>
    );
  };

  return (
    <>
      <Head>
        <title>RuneWars Fate Deck</title>
        <meta
          name="description"
          content="Simulate drawing cards from RuneWars"
        />
        <link rel="icon" href="/favicon.png" />
      </Head>

      <main className={styles.indexPage}>
        <div className={styles.deck}>
          {deck.length} card{deck.length > 1 ? "s" : ""} in deck
        </div>

        <NumberSpinner
          label="Cards to draw"
          initialValue={cardsToDraw}
          min={1}
          max={deck.length}
          onChange={(newValue) => setCardsToDraw(newValue)}
        />

        <details className={styles.stats}>
          <summary>Stats</summary>
          <StatsTable cardsToDraw={cardsToDraw} deck={deck} />
          <DestinyStats deck={deck} cardsToDraw={cardsToDraw} />
        </details>

        <div className={styles.actions}>
          <Button onClick={drawCard}>Draw</Button>
          <Button onClick={resetDeck}>Reshuffle</Button>
        </div>

        {drawnCards.length > 0 && <Results />}
      </main>
    </>
  );
};

export default Draw;
