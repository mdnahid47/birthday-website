import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, RoundedBox } from "@react-three/drei";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import confetti from "canvas-confetti";

const WISH = `Dear Sharmin,

On your 17th birthday,
I just want to wish you
a life full of happiness,
peace and beautiful memories.

May Allah bless you
with everything your heart wishes for.

May your smile always stay beautiful,
and may every new year of your life
bring you closer to your dreams.

Happy 17th Birthday, Sharmin ❤️`;


// =====================================================
// RESPONSIVE 3D GIFT
// =====================================================

function GiftBox({ onOpen }) {
  const boxRef = useRef();
  const lidRef = useRef();

  const [opened, setOpened] = useState(false);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    if (boxRef.current) {
      boxRef.current.rotation.y =
        Math.sin(time * 0.6) * 0.18;

      boxRef.current.position.y =
        Math.sin(time * 1.5) * 0.08;
    }

    if (lidRef.current) {
      const target = opened ? -1.25 : 0;

      lidRef.current.rotation.x +=
        (target - lidRef.current.rotation.x) * 0.08;
    }
  });

  const handleOpen = () => {
    if (opened) return;

    setOpened(true);
    onOpen();

    confetti({
      particleCount: 180,
      spread: 110,
      startVelocity: 35,
      origin: {
        x: 0.5,
        y: 0.65,
      },
    });
  };

  return (
    <group
      ref={boxRef}
      onClick={handleOpen}
      scale={1.05}
    >

      {/* Gift Body */}
      <RoundedBox
        args={[2.5, 1.7, 2.5]}
        radius={0.12}
        smoothness={5}
        position={[0, -0.35, 0]}
      >
        <meshStandardMaterial
          color="#e91e63"
          metalness={0.45}
          roughness={0.25}
        />
      </RoundedBox>

      {/* Vertical Ribbon */}
      <mesh position={[0, -0.35, 1.27]}>
        <boxGeometry args={[0.28, 1.8, 0.05]} />
        <meshStandardMaterial
          color="#ffd54f"
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>

      <mesh position={[0, -0.35, -1.27]}>
        <boxGeometry args={[0.28, 1.8, 0.05]} />
        <meshStandardMaterial
          color="#ffd54f"
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>

      {/* Horizontal Ribbon */}
      <mesh position={[1.27, -0.35, 0]}>
        <boxGeometry args={[0.05, 1.8, 0.28]} />
        <meshStandardMaterial
          color="#ffd54f"
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>

      <mesh position={[-1.27, -0.35, 0]}>
        <boxGeometry args={[0.05, 1.8, 0.28]} />
        <meshStandardMaterial
          color="#ffd54f"
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>

      {/* Lid */}
      <group
        ref={lidRef}
        position={[0, 0.65, -1.05]}
      >
        <RoundedBox
          args={[2.7, 0.38, 2.7]}
          radius={0.12}
          smoothness={5}
          position={[0, 0, 1.05]}
        >
          <meshStandardMaterial
            color="#ff5c9a"
            metalness={0.4}
            roughness={0.25}
          />
        </RoundedBox>

        <mesh position={[0, 0.21, 1.05]}>
          <boxGeometry args={[0.3, 0.08, 2.7]} />
          <meshStandardMaterial
            color="#ffd54f"
            metalness={0.8}
          />
        </mesh>
      </group>

      {/* Bow */}
      <mesh
        position={[-0.25, 1.05, 0]}
        rotation={[0, 0, 0.3]}
      >
        <torusGeometry args={[0.25, 0.07, 20, 40]} />
        <meshStandardMaterial
          color="#ffd54f"
          metalness={0.8}
        />
      </mesh>

      <mesh
        position={[0.25, 1.05, 0]}
        rotation={[0, 0, -0.3]}
      >
        <torusGeometry args={[0.25, 0.07, 20, 40]} />
        <meshStandardMaterial
          color="#ffd54f"
          metalness={0.8}
        />
      </mesh>

      <mesh position={[0, 1.05, 0]}>
        <sphereGeometry args={[0.1, 32, 32]} />
        <meshStandardMaterial
          color="#ffeb3b"
          metalness={0.9}
        />
      </mesh>
    </group>
  );
}


// =====================================================
// GOLDEN SPARKLES
// =====================================================

function GoldenSparkles() {
  const sparkles = useMemo(
    () =>
      Array.from({ length: 45 }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: 2 + Math.random() * 5,
        delay: Math.random() * 4,
        duration: 1.5 + Math.random() * 2,
      })),
    []
  );

  return (
    <div className="pointer-events-none absolute inset-0 z-10 overflow-hidden">
      {sparkles.map((sparkle) => (
        <motion.span
          key={sparkle.id}
          className="absolute rounded-full bg-yellow-300 shadow-[0_0_14px_rgba(255,213,79,0.9)]"
          style={{
            left: `${sparkle.left}%`,
            top: `${sparkle.top}%`,
            width: `${sparkle.size}px`,
            height: `${sparkle.size}px`,
          }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0.4, 1.5, 0.4],
          }}
          transition={{
            duration: sparkle.duration,
            delay: sparkle.delay,
            repeat: Infinity,
          }}
        />
      ))}
    </div>
  );
}


// =====================================================
// HEART PARTICLES
// =====================================================

function HeartParticles() {
  const hearts = useMemo(
    () =>
      Array.from({ length: 22 }).map((_, i) => ({
        id: i,
        left: 5 + Math.random() * 90,
        delay: Math.random() * 4,
        duration: 4 + Math.random() * 3,
        size: 16 + Math.random() * 18,
      })),
    []
  );

  return (
    <div className="pointer-events-none absolute inset-0 z-40 overflow-hidden">
      {hearts.map((heart) => (
        <motion.span
          key={heart.id}
          className="absolute"
          style={{
            left: `${heart.left}%`,
            bottom: "-50px",
            fontSize: `${heart.size}px`,
          }}
          animate={{
            y: "-115vh",
            x: [0, 30, -25, 20, 0],
            rotate: [0, 15, -15, 10, 0],
            opacity: [0, 1, 1, 0.7, 0],
          }}
          transition={{
            duration: heart.duration,
            delay: heart.delay,
            repeat: Infinity,
            ease: "easeOut",
          }}
        >
          ❤️
        </motion.span>
      ))}
    </div>
  );
}


// =====================================================
// ROSE PETALS
// =====================================================

function RosePetals() {
  const petals = useMemo(
    () =>
      Array.from({ length: 30 }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 5,
        duration: 6 + Math.random() * 5,
        size: 14 + Math.random() * 20,
      })),
    []
  );

  return (
    <div className="pointer-events-none absolute inset-0 z-30 overflow-hidden">
      {petals.map((petal) => (
        <motion.img
          key={petal.id}
          src="/images/rose-petal.png"
          alt=""
          draggable={false}
          className="absolute select-none"
          style={{
            left: `${petal.left}%`,
            width: `${petal.size}px`,
          }}
          initial={{
            y: "-10vh",
            opacity: 0,
            rotate: 0,
          }}
          animate={{
            y: "110vh",
            opacity: [0, 1, 1, 0],
            rotate: 720,
            x: [0, 25, -20, 20, 0],
          }}
          transition={{
            duration: petal.duration,
            delay: petal.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}


// =====================================================
// FIREWORKS
// =====================================================

function launchFireworks() {
  const colors = [
    "#ff4d8d",
    "#ffd54f",
    "#ffffff",
    "#ff8a65",
    "#ce93d8",
  ];

  const end = Date.now() + 6000;

  const fire = () => {
    confetti({
      particleCount: 7,
      angle: 60,
      spread: 75,
      startVelocity: 45,
      origin: {
        x: 0,
        y: 0.7,
      },
      colors,
    });

    confetti({
      particleCount: 7,
      angle: 120,
      spread: 75,
      startVelocity: 45,
      origin: {
        x: 1,
        y: 0.7,
      },
      colors,
    });

    if (Date.now() < end) {
      requestAnimationFrame(fire);
    }
  };

  fire();
}


// =====================================================
// BIRTHDAY CARD
// =====================================================

function BirthdayCard({ onFinished }) {
  const [isOpen, setIsOpen] = useState(false);
  const [typedText, setTypedText] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 1300);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    let index = 0;

    const timer = setInterval(() => {
      index++;

      setTypedText(WISH.slice(0, index));

      if (index >= WISH.length) {
        clearInterval(timer);

        // Fireworks + music ONLY after typing ends
        setTimeout(() => {
          onFinished();
        }, 1200);
      }
    }, 28);

    return () => clearInterval(timer);
  }, [isOpen, onFinished]);

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 180,
        scale: 0.65,
      }}
      animate={{
        opacity: 1,
        y: 0,
        scale: 1,
      }}
      transition={{
        duration: 1.3,
        type: "spring",
        stiffness: 80,
      }}
      className="
        absolute
        left-1/2
        top-1/2
        z-50
        w-[92vw]
        max-w-[430px]
        -translate-x-1/2
        -translate-y-1/2
      "
    >
      <div className="relative h-[min(560px,78vh)] min-h-[480px]">
        <AnimatePresence>
          {!isOpen && (
            <motion.div
              initial={{ rotateY: 0 }}
              animate={{ rotateY: 180 }}
              transition={{
                duration: 1.5,
                ease: "easeInOut",
              }}
              className="
                absolute
                inset-0
                z-20
                flex
                items-center
                justify-center
                rounded-[28px]
                bg-gradient-to-br
                from-pink-500
                via-rose-600
                to-purple-700
                shadow-[0_0_80px_rgba(244,63,94,0.35)]
              "
              style={{
                transformStyle: "preserve-3d",
              }}
            >
              <div className="text-center text-white">
                <div className="text-6xl">💌</div>

                <h3 className="mt-5 text-2xl font-semibold">
                  A Special Wish
                </h3>

                <p className="mt-2 text-sm text-pink-100">
                  Just For Sharmin
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Paper */}
        <motion.div
          initial={{
            opacity: 0,
            rotateX: 80,
            scale: 0.8,
          }}
          animate={{
            opacity: isOpen ? 1 : 0,
            rotateX: isOpen ? 0 : 80,
            scale: isOpen ? 1 : 0.8,
          }}
          transition={{
            duration: 1.2,
          }}
          className="
            relative
            h-full
            overflow-hidden
            rounded-[28px]
            border
            border-yellow-200/70
            bg-[#fffdf5]
            p-6
            shadow-[0_20px_80px_rgba(0,0,0,0.45)]
            sm:p-8
          "
        >
          <div className="text-center text-4xl">
            🌹
          </div>

          <h2 className="
            handwriting
            mt-2
            text-center
            text-3xl
            font-bold
            text-rose-600
            sm:text-4xl
          ">
            Happy 17th Birthday
          </h2>

          <h3 className="
            handwriting
            mt-1
            text-center
            text-3xl
            text-pink-500
          ">
            Sharmin ❤️
          </h3>

          <div className="my-4 h-px bg-rose-200" />

          <pre className="
            max-h-[330px]
            overflow-hidden
            whitespace-pre-wrap
            font-[Dancing_Script]
            text-[15px]
            leading-6
            text-gray-700
            sm:text-[17px]
            sm:leading-7
          ">
            {typedText}
            <span className="animate-pulse text-rose-500">
              |
            </span>
          </pre>

          <div className="
            absolute
            bottom-4
            left-0
            w-full
            px-5
            text-center
          ">
            <p className="
              handwriting
              text-lg
              text-gray-500
            ">
              Made with ❤️ just for you
            </p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}


// =====================================================
// MAIN COMPONENT
// =====================================================

export default function Gift3D() {
  const [giftOpened, setGiftOpened] = useState(false);
  const [showCard, setShowCard] = useState(false);
  const [celebration, setCelebration] = useState(false);

  const handleGiftOpen = () => {
    setGiftOpened(true);

    setTimeout(() => {
      setShowCard(true);
    }, 1800);
  };

  const handleCardFinished = () => {
    setCelebration(true);

    // Final fireworks after wish
    launchFireworks();
  };

  return (
    <section
      className="
        relative
        min-h-[680px]
        w-full
        overflow-hidden
        rounded-[30px]
        sm:min-h-[750px]
        sm:rounded-[40px]
      "
    >

      {/* Background */}
      <div className="
        absolute
        inset-0
        bg-gradient-to-b
        from-[#100817]
        via-[#210b20]
        to-[#07070c]
      " />

      {/* Main Glow */}
      <div className="
        absolute
        left-1/2
        top-1/2
        h-[320px]
        w-[320px]
        -translate-x-1/2
        -translate-y-1/2
        rounded-full
        bg-pink-500/15
        blur-[90px]
        sm:h-[550px]
        sm:w-[550px]
        sm:blur-[130px]
      " />

      {/* Golden Sparkles */}
      <GoldenSparkles />

      {/* Hearts */}
      {giftOpened && <HeartParticles />}

      {/* Roses */}
      {giftOpened && <RosePetals />}

      {/* Music */}
      {celebration && (
        <audio
          src="/music/happy-birthday.mp3"
          autoPlay
          loop
        />
      )}

      {/* Gift */}
      {!showCard && (
        <div className="absolute inset-0 z-20">

          <Canvas
            camera={{
              position: [0, 1.8, 6.5],
              fov: 45,
            }}
            dpr={[1, 1.7]}
          >
            <ambientLight intensity={1.4} />

            <directionalLight
              position={[5, 6, 5]}
              intensity={3}
            />

            <pointLight
              position={[0, 3, 2]}
              intensity={4}
              color="#ffd54f"
            />

            <pointLight
              position={[-4, 2, -3]}
              intensity={2}
              color="#ff4d8d"
            />

            <GiftBox
              onOpen={handleGiftOpen}
            />

            <OrbitControls
              enableZoom={false}
              enablePan={false}
              enableRotate={false}
            />
          </Canvas>

          {!giftOpened && (
            <motion.div
              animate={{
                opacity: [0.5, 1, 0.5],
                y: [5, 0, 5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
              className="
                absolute
                bottom-8
                left-1/2
                z-50
                -translate-x-1/2
                text-center
                text-white
              "
            >
              <p className="
                text-base
                font-semibold
                sm:text-lg
              ">
                🎁 Open Your Surprise
              </p>

              <p className="
                mt-1
                text-xs
                text-pink-200
                sm:text-sm
              ">
                Tap the gift
              </p>
            </motion.div>
          )}
        </div>
      )}

      {/* Birthday Card */}
      {showCard && (
        <BirthdayCard
          onFinished={handleCardFinished}
        />
      )}

      {/* Final Message */}
      {celebration && (
        <motion.div
          initial={{
            opacity: 0,
            y: 30,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          className="
            absolute
            bottom-5
            left-1/2
            z-[70]
            -translate-x-1/2
            whitespace-nowrap
            text-center
          "
        >
          <p className="
            handwriting
            text-xl
            text-yellow-200
            drop-shadow-[0_0_10px_rgba(255,213,79,0.7)]
            sm:text-2xl
          ">
            Happy Birthday Sharmin ❤️
          </p>
        </motion.div>
      )}

    </section>
  );
}