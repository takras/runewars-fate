import { useState } from "react";
import Cards from "./api/cards.json";
import { NextPage } from "next";
import { Card } from "./api/types";
import Head from "next/head";

import styles from "./index.module.css";
import NumberSpinner from "../components/number-spinner";
import Button from "../components/button";
import DestinyStats from "../components/destiny-stats";
import StatsTable from "../components/stats-table";
import CardResults from "../components/card-results";

const Draw: NextPage = () => {
  const [initialCards] = useState(Cards.cards as Card[]);
  const [deck, setDeck] = useState([...initialCards]);
  const [cardsDrawn, setCardsDrawn] = useState<Card[]>([]);
  const [, setCurrentCard] = useState<Card>();
  const [cardsToDraw, setCardsToDraw] = useState(1);

  const drawCard = () => {
    setCardsDrawn([]);
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
    setCardsDrawn(cardList);
    setCurrentCard(cardList[cardList.length - 1]);
    setCardsToDraw(1);
  };

  const resetDeck = () => {
    setCardsDrawn([]);
    setDeck(initialCards);
    setCurrentCard(undefined);
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

        {cardsDrawn.length > 0 && (
          <div className={styles.results}>
            <CardResults cardsDrawn={cardsDrawn} />
          </div>
        )}
      </main>
    </>
  );
};

export default Draw;
