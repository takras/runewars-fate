import { cumulativeHypergeometric } from "../../pages/api/hypergeometric";
import { Icon } from "../../pages/api/image";
import { avg, getShapeStats, range } from "../../pages/api/stats";
import { Card, Shapes, Stats } from "../../pages/api/types";

import styles from "./index.module.css";

const StatsRow = ({
  shape,
  stats,
  cardsToDraw,
}: {
  shape: Shapes;
  stats: Stats;
  cardsToDraw: number;
}) => {
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
      <td className={styles.colGroup}>{chance(stats.route)}%</td>
      <td>{avg(stats.route)}</td>
      <td>{range(stats.route)}</td>
      <td className={styles.colGroup}>
        {cumulativeHypergeometric(
          stats.cardsLeft,
          stats.special,
          cardsToDraw,
          1
        )}
        %
      </td>
    </tr>
  );
};

const StatsTable = ({
  cardsToDraw,
  deck,
}: {
  cardsToDraw: number;
  deck: Card[];
}) => {
  const triangleStat = getShapeStats("triangle", deck);
  const circleStat = getShapeStats("circle", deck);
  const rectangleStat = getShapeStats("rectangle", deck);
  const hexagonStat = getShapeStats("hexagon", deck);

  return (
    <table className={styles.statsTable}>
      <thead>
        <tr>
          <th></th>
          <th>
            <Icon symbol="damage" />
          </th>
          <th>Avg</th>
          <th>Rng</th>
          <th className={styles.colGroup}>
            <Icon symbol="route" />
          </th>
          <th>Avg</th>
          <th>Rng</th>
          <th className={styles.colGroup}>
            <Icon symbol="special" />
          </th>
        </tr>
      </thead>
      <tbody>
        <StatsRow
          shape="triangle"
          stats={triangleStat}
          cardsToDraw={cardsToDraw}
        />
        <StatsRow shape="circle" stats={circleStat} cardsToDraw={cardsToDraw} />
        <StatsRow
          shape="rectangle"
          stats={rectangleStat}
          cardsToDraw={cardsToDraw}
        />
        <StatsRow
          shape="hexagon"
          stats={hexagonStat}
          cardsToDraw={cardsToDraw}
        />
      </tbody>
    </table>
  );
};

export default StatsTable;
