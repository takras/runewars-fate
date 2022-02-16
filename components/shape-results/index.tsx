import { CardType, Shapes } from "../../pages/api/types";
import styles from "./index.module.css";

const ShapeResults = ({
  shape,
  results,
}: {
  shape: Shapes;
  results: Record<CardType, number>;
}) => {
  return (
    <div className={`${styles.shapeResult} ${styles[`shapeResult--${shape}`]}`}>
      <h3 className="sr-only">{shape}</h3>
      <dl>
        <div>
          {results.route > 0 && (
            <>
              <dt className="sr-only">Route</dt>
              <dd>{results.route}</dd>
            </>
          )}
        </div>
        <div>
          {results.damage > 0 && (
            <>
              <dt className="sr-only">Damage</dt>
              <dd>{results.damage}</dd>
            </>
          )}
        </div>
        <div>
          {results.special > 0 && (
            <>
              <dt className="sr-only">Special</dt>
              <dd>{results.special}</dd>
            </>
          )}
        </div>
      </dl>
    </div>
  );
};

export default ShapeResults;
