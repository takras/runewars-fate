import { cumulativeHypergeometric } from "../../lib/hypergeometric";
import { Icon } from "../../lib/image";
import { getDestinyStats } from "../../lib/stats";
import { Card } from "../../lib/types";
import styles from "./index.module.css";

const DestinyStats = ({
  cardsToDraw,
  deck,
}: {
  cardsToDraw: number;
  deck: Card[];
}) => {
  const stats = getDestinyStats(deck);

  return (
    <section className={styles.destinyStats}>
      <h3>Destiny</h3>
      <div>
        <Icon symbol="gold" />
      </div>
      <div>
        {cumulativeHypergeometric(stats.cardsLeft, stats.gold, cardsToDraw, 1)}%
      </div>
      <div>
        <Icon symbol="blank" />
      </div>
      <div>
        {cumulativeHypergeometric(stats.cardsLeft, stats.grey, cardsToDraw, 1)}%
      </div>
      <div>
        <Icon symbol="red" />
      </div>
      <div>
        {cumulativeHypergeometric(stats.cardsLeft, stats.red, cardsToDraw, 1)}%
      </div>
    </section>
  );
};
export default DestinyStats;
