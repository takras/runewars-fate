import "../styles/globals.css";
import type { AppProps } from "next/app";
import AppHeader from "../components/app-header";

import styles from "./app.module.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <div className={styles.app}>
        <div className={styles.appFlap}>
          <AppHeader />
        </div>
        <div className={styles.appPage}>
          <Component {...pageProps} />
        </div>
        <div className={styles.appFlap}>
          <a
            href="https://github.com/takras/runewars-fate"
            rel="noreferrer"
            target="_blank"
          >
            https://github.com/takras/runewars-fate
          </a>
        </div>
      </div>
    </>
  );
}

export default MyApp;
