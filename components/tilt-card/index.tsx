import { ReactNode, useEffect, useRef } from "react";
import styles from "./index.module.css";

// Higher is snappier; this is the rate the card catches up with the pointer.
const FOLLOW_SPEED = 9;
const SETTLE_THRESHOLD = 0.001;

const clamp = (value: number) => Math.min(1, Math.max(-1, value));

/**
 * Sizes its child to the largest card that fits the available space, and tilts
 * it towards the mouse (or a dragging finger) anywhere on the page.
 */
const TiltCard = ({ children }: { children: ReactNode }) => {
  const tiltRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tilt = tiltRef.current;
    const stage = tilt?.parentElement;
    if (!tilt || !stage) {
      return;
    }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    let targetX = 0;
    let targetY = 0;
    let x = 0;
    let y = 0;
    let frame = 0;
    let lastTime = 0;

    // Written straight to the element so pointer movement never re-renders React.
    const animate = (time: number) => {
      const elapsed = Math.min((time - lastTime) / 1000, 0.1);
      lastTime = time;
      const step = 1 - Math.exp(-FOLLOW_SPEED * elapsed);
      x += (targetX - x) * step;
      y += (targetY - y) * step;
      tilt.style.setProperty("--tilt-x", x.toFixed(4));
      tilt.style.setProperty("--tilt-y", y.toFixed(4));

      const settled =
        Math.abs(targetX - x) < SETTLE_THRESHOLD &&
        Math.abs(targetY - y) < SETTLE_THRESHOLD;
      frame = settled ? 0 : requestAnimationFrame(animate);
    };

    const startAnimating = () => {
      if (!frame) {
        lastTime = performance.now();
        frame = requestAnimationFrame(animate);
      }
    };

    const moveTowards = (nextX: number, nextY: number) => {
      targetX = nextX;
      targetY = nextY;
      startAnimating();
    };

    const handlePointerMove = (ev: PointerEvent) => {
      const bounds = stage.getBoundingClientRect();
      const centerX = bounds.left + bounds.width / 2;
      const centerY = bounds.top + bounds.height / 2;
      moveTowards(
        clamp((ev.clientX - centerX) / (window.innerWidth / 2)),
        clamp((ev.clientY - centerY) / (window.innerHeight / 2))
      );
    };

    const handleRelease = (ev: PointerEvent) => {
      // A mouse keeps hovering after a click; only a lifted finger is gone.
      if (ev.pointerType === "touch") {
        moveTowards(0, 0);
      }
    };

    const handleLeave = () => moveTowards(0, 0);

    const root = document.documentElement;
    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handleRelease);
    window.addEventListener("pointercancel", handleLeave);
    window.addEventListener("blur", handleLeave);
    root.addEventListener("pointerleave", handleLeave);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handleRelease);
      window.removeEventListener("pointercancel", handleLeave);
      window.removeEventListener("blur", handleLeave);
      root.removeEventListener("pointerleave", handleLeave);
    };
  }, []);

  return (
    <div className={styles.stage}>
      <div className={styles.tilt} ref={tiltRef}>
        {children}
      </div>
    </div>
  );
};

export default TiltCard;
