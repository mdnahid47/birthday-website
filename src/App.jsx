import { useEffect, useState } from "react";

import Countdown from "./components/Countdown";
import Birthday from "./components/Birthday";

/*
=========================================
DEVELOPMENT MODE


false = Countdown → Birthday
=========================================
*/

const DEV_MODE = false;

/*
=========================================
REAL BIRTHDAY
02 September 2026
=========================================
*/

const BIRTHDAY_DATE = new Date("2026-09-27T00:00:00");

export default function App() {

  const [isUnlocked, setIsUnlocked] = useState(false);

  useEffect(() => {

    if (DEV_MODE) {
      setIsUnlocked(true);
      return;
    }

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

      {

        isUnlocked ?

          <Birthday />

          :

          <Countdown
            birthdayDate={BIRTHDAY_DATE}
          />

      }

    </main>

  );

}