import {
  KeyboardEventHandler,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import Button from "../button";
import styles from "./index.module.css";

interface Props {
  label: string;
  initialValue: number;
  min: number;
  max: number;
  onChange: (newValue: number) => void;
}

const NumberSpinner = ({ label, initialValue, min, max, onChange }: Props) => {
  const [current, setCurrent] = useState(initialValue);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.value = initialValue.toString();
      setCurrent(initialValue);
    }
  }, [initialValue]);

  const handleInputBlur = () => {
    if (inputRef.current) {
      inputRef.current.value = current.toString();
    }
  };

  const handleInputChange = () => {
    if (inputRef.current) {
      const numericVal = Number.parseInt(inputRef.current.value, 10);
      updateCurrentValue(numericVal);
    }
  };

  const handleInputKey: KeyboardEventHandler<HTMLInputElement> = (ev) => {
    switch (ev.key) {
      case "Enter":
        handleInputBlur();
        break;
      case "e":
      case "-":
        ev.preventDefault();
        break;
    }
  };

  const updateCurrentValue = (val: number) => {
    if (min <= val && max >= val) {
      setCurrent(val);
      onChange(val);

      if (inputRef.current) {
        inputRef.current.value = val.toString();
      }
    }
  };

  return (
    <div className={styles.numberSpinner}>
      <label>
        <span>{label}</span>
        <input
          defaultValue={current.toString()}
          max={max.toString()}
          min={min.toString()}
          onBlur={handleInputBlur}
          onChange={handleInputChange}
          onKeyDown={handleInputKey}
          ref={inputRef}
          type="number"
        />
      </label>

      <div className={styles.buttons}>
        <Button onClick={() => updateCurrentValue(current - 1)}>-</Button>
        <Button onClick={() => updateCurrentValue(current + 1)}>+</Button>
      </div>
    </div>
  );
};

export default NumberSpinner;
