import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import Confetti from "react-confetti";
import { useEffect, useState } from "react";

import Music from "./Music";
import Roses from "./Roses";
import Fireworks from "./Fireworks";
import Gift3D from "./Gift3D";

export default function Birthday() {

  const [showGift, setShowGift] = useState(false);

  useEffect(() => {

    const timer = setTimeout(() => {
      setShowGift(true);
    }, 4500);

    return () => clearTimeout(timer);

  }, []);

  return (

    <section className="relative min-h-screen hero-bg overflow-hidden">

      <Confetti recycle numberOfPieces={220} />

      <Music />

      <Roses />

      <Fireworks />

      {/* Background Blur */}

      <div className="absolute left-0 top-0 h-80 w-80 rounded-full bg-pink-500/20 blur-[120px]" />

      <div className="absolute right-0 bottom-0 h-80 w-80 rounded-full bg-purple-600/20 blur-[120px]" />

      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 text-center">

        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="mb-5 text-lg tracking-[6px] text-pink-300 uppercase"
        >
          A Gift For Sharmin
        </motion.h2>

        <motion.h1
          initial={{ y: -60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className="gradient-text glow text-6xl font-extrabold md:text-8xl"
        >
          Happy Birthday
        </motion.h1>

        <motion.h3
          initial={{ scale: .8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            delay: .4,
            duration: .8,
          }}
          className="handwriting mt-4 text-5xl text-pink-200 md:text-6xl"
        >
          Sharmin ❤️
        </motion.h3>

        <div className="mt-10 text-xl text-pink-100 md:text-2xl">

          <TypeAnimation
            sequence={[
              "Hello Sharmin...",
              1800,

              "Today is your special day...",
              1800,

              "Welcome to your birthday surprise...",
              1800,

              "Happy 17th Birthday ❤️",
              3000,
            ]}
            repeat={Infinity}
            speed={45}
          />

        </div>

        <motion.div
          initial={{
            opacity: 0,
            y: 50,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 2,
            duration: 1,
          }}
          className="glass mt-12 max-w-3xl rounded-3xl p-8"
        >

          <p className="leading-9 text-pink-50">

            Every birthday is special,
            but today is even more beautiful
            because it belongs to someone wonderful.

            <br /><br />

            May your smile never fade.

            <br />

            May every dream find its way.

            <br />

            May Allah always protect you.

          </p>

        </motion.div>

        {showGift && (

          <motion.div
            initial={{
              opacity: 0,
              scale: .5,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            transition={{
              duration: 1,
            }}
            className="mt-16 w-full max-w-4xl"
          >

            <Gift3D />

          </motion.div>

        )}

      </div>

    </section>

  );

}