import { useEffect } from "react";
import confetti from "canvas-confetti";

export default function Fireworks() {
  useEffect(() => {
    const duration = 10000;
    const end = Date.now() + duration;

    const colors = [
      "#ff4d8d",
      "#ffb703",
      "#ffffff",
      "#7c3aed",
      "#00e5ff",
    ];

    const interval = setInterval(() => {
      if (Date.now() > end) {
        clearInterval(interval);
        return;
      }

      confetti({
        particleCount: 3,
        angle: 60,
        spread: 80,
        origin: { x: 0 },
        colors,
      });

      confetti({
        particleCount: 3,
        angle: 120,
        spread: 80,
        origin: { x: 1 },
        colors,
      });

    }, 250);

    return () => clearInterval(interval);
  }, []);

  return null;
}