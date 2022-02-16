import styles from "./image.module.css";
import { Symbols } from "./types";
import Image from "next/image";

interface Props {
  symbol: Symbols;
  className?: string;
  times?: number;
}

export const Icon = ({ symbol, className, times = 1 }: Props) => {
  let width = 0;
  let height = 0;
  let folder = "";
  let fileName = symbol.toString();
  switch (symbol) {
    case "triangle":
    case "circle":
      folder = "shapes";
      width = 25;
      height = 25;
      break;
    case "hexagon":
      folder = "shapes";
      width = 25;
      height = 22;
      break;
    case "rectangle":
      folder = "shapes";
      width = 19;
      height = 25;
      break;
    case "gold":
      folder = "destiny";
      width = 35;
      height = 35;
      break;
    case "red":
      folder = "destiny";
      width = 30;
      height = 37;
      break;
    case "blank":
      folder = "destiny";
      width = 38;
      height = 27;
      break;
    case "damage":
      fileName = "damage";
      folder = "icons";
      width = 18;
      height = 25;
      break;
    case "route":
      fileName = "route";
      folder = "icons";
      width = 120;
      height = 95;
      break;
    case "special":
      folder = "icons";
      width = 95;
      height = 118;
      break;
    case "damage":
      folder = "icons";
      width = 50;
      height = 50;
      break;
  }

  const images: JSX.Element[] = [];

  for (let i = 0; i < times; i++) {
    images.push(
      <div
        className={`
          ${styles.icons}
          ${folder === "destiny" ? styles.destiny : ""}
          ${className || ""}
        `}
        key={i}
      >
        <Image
          alt={fileName}
          width={width}
          height={height}
          src={`/${folder}/${fileName}.png`}
        />
      </div>
    );
  }

  return <>{images}</>;
};
