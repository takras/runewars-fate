import { useState } from "react";
import Cards from "../lib/cards.json";
import { NextPage } from "next";
import { Card } from "../lib/types";
import { assetPath } from "../lib/asset-path";
import Head from "next/head";

import styles from "./index.module.css";
import NumberSpinner from "../components/number-spinner";
import Button from "../components/button";
import DestinyStats from "../components/destiny-stats";
import StatsTable from "../components/stats-table";
import CardResults from "../components/card-results";
import AppHeader from "../components/app-header";
import TiltCard from "../components/tilt-card";

const Draw: NextPage = () => {
  const [initialCards] = useState(Cards.cards as Card[]);
  const [deck, setDeck] = useState([...initialCards]);
  const [cardsDrawn, setCardsDrawn] = useState<Card[]>([]);
  const [, setCurrentCard] = useState<Card>();
  const [cardsToDraw, setCardsToDraw] = useState(1);
  const [gameName, setGameName] = useState("ABCDE");

  const drawCard = () => {
    setCardsDrawn([]);
    const cardList = [];
    let deckClone = [...deck];
    let cardsDrawn = [];
    for (let i = 0; i < cardsToDraw; i++) {
      const random = Math.floor(Math.random() * deckClone.length);
      const drawnCard = deckClone[random];
      cardsDrawn.push(drawnCard);
      deckClone.splice(random, 1);
      if (deckClone.length === 0) {
        deckClone = [...initialCards];
      }
      cardList.push(drawnCard);
    }
    console.log(deckClone, cardsDrawn);
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
        <link rel="icon" href={assetPath("/favicon.png")} />
      </Head>

      <main className={styles.indexPage}>
        <div className={styles.header}>
          <AppHeader />
        </div>

        <div className={styles.stage}>
          <TiltCard>
            {cardsDrawn.length > 0 ? (
              <CardResults cardsDrawn={cardsDrawn} />
            ) : (
              <div className={styles.empty}>
                <span className={styles.emptyLabel}>
                  Draw to reveal your fate
                </span>
              </div>
            )}
          </TiltCard>
        </div>

        <section className={styles.panel}>
          <div className={styles.controls}>
            <div className={styles.deck}>
              <span className={styles.label}>In deck</span>
              <span className={styles.deckCount}>{deck.length}</span>
            </div>

            <NumberSpinner
              label="Cards to draw"
              initialValue={cardsToDraw}
              min={1}
              max={deck.length}
              onChange={(newValue) => setCardsToDraw(newValue)}
            />
          </div>

          <div className={styles.stats}>
            <StatsTable cardsToDraw={cardsToDraw} deck={deck} />
            <DestinyStats deck={deck} cardsToDraw={cardsToDraw} />
          </div>

          <div className={styles.actions}>
            <Button variant="primary" onClick={drawCard}>
              Draw
            </Button>
            <Button variant="secondary" onClick={resetDeck}>
              Reshuffle
            </Button>
          </div>
        </section>
      </main>
    </>
  );
};

export default Draw;
