import styles from "./index.module.css";

const AppHeader = () => {
  return (
    <header className={styles.header}>
      <h1>RuneWars Fate Deck</h1>
      <a
        href="https://github.com/takras/runewars-fate"
        rel="noreferrer"
        target="_blank"
      >
        GitHub
      </a>
    </header>
  );
};

export default AppHeader;
