import { useEffect, useState } from "react";

import Countdown from "./components/Countdown";
import Birthday from "./components/Birthday";
import Music from "./components/Music";

/*
  DEVELOPMENT MODE

  true  = সরাসরি Birthday page
  false = Countdown → Birthday
*/
const DEV_MODE = true;

/*
  Birthday Date
*/
const BIRTHDAY_DATE = new Date("2026-09-27T00:00:00");

export default function App() {
  const [isUnlocked, setIsUnlocked] = useState(false);

  useEffect(() => {
    // Development mode
    if (DEV_MODE) {
      setIsUnlocked(true);
      return;
    }

    // Birthday check
    const checkBirthday = () => {
      if (new Date() >= BIRTHDAY_DATE) {
        setIsUnlocked(true);
      }
    };

    checkBirthday();

    const interval = setInterval(checkBirthday, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <main
      className="
        min-h-screen
        hero-bg
        overflow-hidden
        text-white
      "
    >
      {/* Background Music */}
      <Music />

      {/* Countdown / Birthday */}
      {isUnlocked ? (
        <Birthday />
      ) : (
        <Countdown birthdayDate={BIRTHDAY_DATE} />
      )}
    </main>
  );
}