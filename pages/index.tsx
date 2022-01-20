import { useState } from "react";
import Cards from "./api/cards.json";
import { NextPage } from "next";
import { Icon } from "./api/image";
import { Card, Shapes, Stats, Symbols } from "./api/types";
import Head from "next/head";
import { cumulativeHypergeometric } from "./api/hypergeometric";

import styles from "./index.module.css";

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
        const a = card1[shape] || "";
        const b = card2[shape] || "";
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
            symbol={result[shape] as Symbols}
          />
        ) : null;
      });
  };

  const Results = () => {
    return (
      <table className={styles.resultTable}>
        <thead>
          <tr>
            <th colSpan={1}>Results:</th>
            <th>
              {drawnCards.length > 0 && `Drew ${drawnCards.length} cards`}
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
    );
  };

  const getShapeStats = (shape: Shapes) => {
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

  const sum = (acc: number, curr: number) => acc + curr;
  const avg = (list: number[]) =>
    list.length === 0 ? "---" : (list.reduce(sum) / list.length).toFixed(1);
  const range = (list: number[]) => {
    if (list.length === 0) {
      return "----";
    }
    const min = Math.min(...list);
    const max = Math.max(...list);
    if (min === max) {
      return "---";
    }
    return `${min}-${max}`;
  };

  const Destiny = (stats: {
    red: number;
    gold: number;
    blank: number;
    cardsLeft: number;
  }) => {
    return (
      <tr>
        <td>&nbsp;</td>
        <td colSpan={2}>Destiny</td>
        <td>
          <Icon symbol="gold" />
        </td>
        <td>
          {cumulativeHypergeometric(
            stats.cardsLeft,
            stats.gold,
            cardsToDraw,
            1
          )}
          %
        </td>
        <td>
          <Icon symbol="blank" />
        </td>
        <td>
          {cumulativeHypergeometric(
            stats.cardsLeft,
            stats.blank,
            cardsToDraw,
            1
          )}
          %
        </td>
        <td>
          <Icon symbol="red" />
        </td>
        <td>
          {cumulativeHypergeometric(stats.cardsLeft, stats.red, cardsToDraw, 1)}
          %
        </td>
      </tr>
    );
  };

  const shapeStatRow = (shape: Shapes, stats: Stats) => {
    const chance = (list: number[]) => {
      return cumulativeHypergeometric(
        stats.cardsLeft,
        list.length,
        cardsToDraw,
        1
      );
    };

    return (
      <tr>
        <td>
          <Icon symbol={shape} />
        </td>
        <td>{chance(stats.damage)}%</td>
        <td>{avg(stats.damage)}</td>
        <td>{range(stats.damage)}</td>
        <td>{chance(stats.route)}%</td>
        <td>{avg(stats.route)}</td>
        <td>{range(stats.route)}</td>
        <td>
          {cumulativeHypergeometric(
            stats.cardsLeft,
            stats.special,
            cardsToDraw,
            1
          )}
          %
        </td>
        <td>
          {cumulativeHypergeometric(
            stats.cardsLeft,
            stats.blank,
            cardsToDraw,
            1
          )}
          %
        </td>
      </tr>
    );
  };

  const triangleStat = getShapeStats("triangle");
  const circleStat = getShapeStats("circle");
  const rectangleStat = getShapeStats("rectangle");
  const hexagonStat = getShapeStats("hexagon");
  const destinyStats = getShapeStats("destiny");

  console.log(destinyStats);

  return (
    <div>
      <Head>
        <title>RuneWars Fate Deck</title>
        <meta
          name="description"
          content="Simulate drawing cards from RuneWars"
        />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <main>
        <table>
          <thead>
            <tr>
              <td>&nbsp;</td>
              <td>
                <Icon symbol="damage1" />
              </td>
              <td>Avg</td>
              <td>Range</td>
              <td>
                <Icon symbol="route1" />
              </td>
              <td>Avg</td>
              <td>Range</td>
              <td>
                <Icon symbol="special" />
              </td>
              <td>BLANK</td>
            </tr>
          </thead>
          <tbody>
            {shapeStatRow("triangle", triangleStat)}
            {shapeStatRow("circle", circleStat)}
            {shapeStatRow("rectangle", rectangleStat)}
            {shapeStatRow("hexagon", hexagonStat)}
            {Destiny(destinyStats)}
            <tr>
              <td colSpan={3}>
                <label htmlFor="numberCards">Cards to draw:</label>
                <input
                  className={styles.numberInput}
                  type="number"
                  min={1}
                  max={30}
                  id="numberCards"
                  onChange={(e) => {
                    const value = parseInt(e.currentTarget.value);
                    if (!isNaN(value)) {
                      setCardsToDraw(parseInt(e.currentTarget.value));
                    }
                  }}
                  value={cardsToDraw}
                />
              </td>
              <td colSpan={3}>
                <button type="button" onClick={drawCard}>
                  Draw {cardsToDraw} card{cardsToDraw !== 1 ? "s" : ""}
                </button>
              </td>
              <td colSpan={5}>
                <button type="button" onClick={resetDeck}>
                  Reshuffle deck ({deck.length} in deck)
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        <Results />
      </main>
    </div>
  );
};

export default Draw;
