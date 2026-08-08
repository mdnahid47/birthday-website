import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function Countdown({ birthdayDate }) {
  const calculateTimeLeft = () => {
    const difference = birthdayDate.getTime() - new Date().getTime();

    if (difference <= 0) {
      return {
        expired: true,
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      };
    }

    return {
      expired: false,
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor(
        (difference / (1000 * 60 * 60)) % 24
      ),
      minutes: Math.floor(
        (difference / (1000 * 60)) % 60
      ),
      seconds: Math.floor(
        (difference / 1000) % 60
      ),
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const items = [
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Minutes", value: timeLeft.minutes },
    { label: "Seconds", value: timeLeft.seconds },
  ];

  return (
    <section className="relative flex min-h-screen items-center justify-center px-6">

      {/* Background Glow */}
      <div className="absolute inset-0 overflow-hidden">

        <div className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-pink-500/20 blur-3xl" />

        <div className="absolute bottom-10 right-0 h-80 w-80 rounded-full bg-purple-500/20 blur-3xl" />

      </div>

      <motion.div
        initial={{ opacity: 0, y: 80 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="glass relative w-full max-w-4xl rounded-3xl p-10 text-center"
      >
        <motion.h1
          initial={{ scale: .8 }}
          animate={{ scale: 1 }}
          transition={{
            repeat: Infinity,
            repeatType: "reverse",
            duration: 2,
          }}
          className="gradient-text text-5xl font-bold"
        >
          🎁 A Gift For Sharmin
        </motion.h1>

        <p className="mt-6 text-lg text-pink-100">
          A beautiful surprise is waiting for you ❤️
        </p>

        <p className="mt-2 text-sm text-pink-300">
          Opens on 27 September 2026
        </p>

        <div className="mt-12 grid grid-cols-2 gap-5 md:grid-cols-4">
          {items.map((item) => (
            <motion.div
              whileHover={{
                scale: 1.08,
              }}
              key={item.label}
              className="rounded-2xl bg-white/10 p-6 backdrop-blur-xl"
            >
              <h2 className="text-5xl font-bold text-white">
                {String(item.value).padStart(2, "0")}
              </h2>

              <p className="mt-3 uppercase tracking-[4px] text-pink-300">
                {item.label}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.p
          animate={{
            opacity: [1, .5, 1],
          }}
          transition={{
            repeat: Infinity,
            duration: 2,
          }}
          className="mt-12 text-pink-200"
        >
          ✨ See you on your special day...
        </motion.p>
      </motion.div>
    </section>
  );
}