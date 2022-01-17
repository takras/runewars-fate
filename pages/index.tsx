import { useState } from "react";
import Cards from "./api/cards.json";
import Image from "next/image";
import { NextPage } from "next";
import { getImage } from "./api/image";
import { Card, Shapes, Stats, Symbols } from "./api/types";
import Head from "next/head";

const Draw: NextPage = () => {
  const [initialCards] = useState(Cards.cards as Card[]);
  const [deck, setDeck] = useState(initialCards);
  const [drawnCards, setDrawnCards] = useState([{}]);
  const [currentCard, setCurrentCard] = useState<Card>();

  const drawCard = () => {
    const random = Math.floor(Math.random() * deck.length);
    const deckClone = [...deck];
    const drawnCard = deckClone[random];
    setDrawnCards([...drawnCards, drawnCard]);
    setCurrentCard(drawnCard);
    console.log(drawnCard, typeof Cards.cards);
    deckClone.splice(random, 1);
    if (deckClone.length === 0) {
      setDeck(initialCards);
    } else {
      setDeck(deckClone);
    }
  };

  const resetDeck = () => {
    setDeck(initialCards);
    setCurrentCard(undefined);
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

  const renderDestiny = (stats: {
    red: number;
    gold: number;
    blank: number;
    cardsLeft: number;
  }) => {
    return (
      <tr>
        <td>&nbsp;</td>
        <td colSpan={2}>Destiny</td>
        <td>{getImage("gold")}</td>
        <td>{Math.round((stats.gold / stats.cardsLeft) * 100)}%</td>
        <td>{getImage("blank")}</td>
        <td>{Math.round((stats.blank / stats.cardsLeft) * 100)}%</td>
        <td>{getImage("red")}</td>
        <td>{Math.round((stats.red / stats.cardsLeft) * 100)}%</td>
      </tr>
    );
  };

  const shapeStatRow = (shape: Shapes, stats: Stats) => {
    const chance = (list: number[]) =>
      Math.round((list.length / stats.cardsLeft) * 100);
    return (
      <tr>
        <td>{getImage(shape)}</td>
        <td>{chance(stats.damage)}%</td>
        <td>{avg(stats.damage)}</td>
        <td>{range(stats.damage)}</td>
        <td>{chance(stats.route)}%</td>
        <td>{avg(stats.route)}</td>
        <td>{range(stats.route)}</td>
        <td>{((stats.special / stats.cardsLeft) * 100).toFixed()}%</td>
        <td>{((stats.blank / stats.cardsLeft) * 100).toFixed()}%</td>
      </tr>
    );
  };

  const triangleStat = getShapeStats("triangle");
  const circleStat = getShapeStats("circle");
  const rectangleStat = getShapeStats("rectangle");
  const hexagonStat = getShapeStats("hexagon");
  const destinyStats = getShapeStats("destiny");

  return (
    <div>
      <Head>
        <title>RuneWars Fate Deck</title>
        <meta
          name="description"
          content="Simulate drawing cards from TuneWars"
        />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <main>
        <table>
          <thead>
            <tr>
              <td>&nbsp;</td>
              <td>{getImage("damage1")}</td>
              <td>Avg</td>
              <td>Range</td>
              <td>{getImage("route1")}</td>
              <td>Avg</td>
              <td>Range</td>
              <td>{getImage("special")}</td>
              <td>BLANK</td>
            </tr>
          </thead>
          <tbody>
            {shapeStatRow("triangle", triangleStat)}
            {shapeStatRow("circle", circleStat)}
            {shapeStatRow("rectangle", rectangleStat)}
            {shapeStatRow("hexagon", hexagonStat)}
            {renderDestiny(destinyStats)}
            <tr>
              <td colSpan={3}>
                <button type="button" onClick={drawCard}>
                  Draw card ({deck.length} left)
                </button>
              </td>
              <td colSpan={2}>
                <button type="button" onClick={resetDeck}>
                  Reshuffle deck
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        {currentCard && (
          <Image
            src={`/fate/${currentCard.id}.png`}
            alt={currentCard.id.toString()}
            width={359}
            height={585}
          />
        )}
      </main>
    </div>
  );
};

export default Draw;
