import "../styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { useEffect } from "react";

function MyApp({ Component, pageProps }: AppProps) {
  // iOS Safari ignores user-scalable=no, so pinching has to be blocked here too.
  useEffect(() => {
    const isTouchDevice = () =>
      window.matchMedia("(pointer: coarse)").matches;

    const blockGesture = (ev: Event) => {
      if (isTouchDevice()) {
        ev.preventDefault();
      }
    };

    const blockPinch = (ev: TouchEvent) => {
      if (ev.touches.length > 1 && isTouchDevice()) {
        ev.preventDefault();
      }
    };

    document.addEventListener("gesturestart", blockGesture);
    document.addEventListener("touchmove", blockPinch, { passive: false });

    return () => {
      document.removeEventListener("gesturestart", blockGesture);
      document.removeEventListener("touchmove", blockPinch);
    };
  }, []);

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover"
        />
        <meta name="theme-color" content="#20140e" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
