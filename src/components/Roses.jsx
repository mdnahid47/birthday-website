import { motion } from "framer-motion";

const petals = Array.from({ length: 45 });

export default function Roses() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-20">
      {petals.map((_, index) => {
        const left = Math.random() * 100;
        const delay = Math.random() * 10;
        const duration = 10 + Math.random() * 8;
        const size = 18 + Math.random() * 22;

        return (
          <motion.img
            key={index}
            src="../../../public/images/rose-petal.png"
            alt=""
            draggable={false}
            className="absolute select-none"
            style={{
              left: `${left}%`,
              width: `${size}px`,
            }}
            initial={{
              y: -120,
              rotate: 0,
              opacity: 0,
            }}
            animate={{
              y: "110vh",
              opacity: [0, 1, 1, 0],
              rotate: [0, 120, 240, 360],
              x: [0, -20, 15, -10, 0],
            }}
            transition={{
              duration,
              delay,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        );
      })}
    </div>
  );
}