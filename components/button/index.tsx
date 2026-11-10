import { ButtonHTMLAttributes } from "react";
import styles from "./index.module.css";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
}

const Button = ({ variant, children, ...buttonProps }: Props) => {
  return (
    <button
      {...buttonProps}
      className={`${styles.button} ${variant ? styles[variant] : ""}`}
    >
      {children}
    </button>
  );
};

export default Button;
