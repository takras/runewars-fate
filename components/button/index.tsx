import { ButtonHTMLAttributes } from "react";
import styles from "./index.module.css";

const Button = (props: ButtonHTMLAttributes<HTMLButtonElement>) => {
  const { children, ...buttonProps } = props;
  return (
    <button {...buttonProps} className={styles.button}>
      {props.children}
    </button>
  );
};

export default Button;
