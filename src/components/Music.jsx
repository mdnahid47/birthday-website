
// import { useEffect, useRef, useState } from "react";

// export default function Music() {
//   const audioRef = useRef(null);
//   const [playing, setPlaying] = useState(false);

//   // First user interaction এর পর music চালু করবে
//   useEffect(() => {
//     const startMusic = async () => {
//       if (!audioRef.current || playing) return;

//       try {
//         await audioRef.current.play();
//         setPlaying(true);
//       } catch (error) {
//         // Browser autoplay block করলে কিছু করবে না
//         console.log("Autoplay blocked:", error);
//       }
//     };

//     window.addEventListener("click", startMusic);
//     window.addEventListener("touchstart", startMusic);

//     return () => {
//       window.removeEventListener("click", startMusic);
//       window.removeEventListener("touchstart", startMusic);
//     };
//   }, [playing]);

//   // Play / Pause button
//   const toggleMusic = async () => {
//     if (!audioRef.current) return;

//     try {
//       if (audioRef.current.paused) {
//         await audioRef.current.play();
//         setPlaying(true);
//       } else {
//         audioRef.current.pause();
//         setPlaying(false);
//       }
//     } catch (error) {
//       console.log("Music error:", error);
//     }
//   };

//   return (
//     <>
//       {/* Background Music */}
//       <audio
//         ref={audioRef}
//         src="../../../public/music/happy-birthday.mp3"
//         loop
//         preload="auto"
//       />

//       {/* Music Button */}
//       <div className="fixed right-5 top-5 z-50">
//         <button
//           onClick={toggleMusic}
//           aria-label={playing ? "Pause music" : "Play music"}
//           className="
//             glass
//             rounded-full
//             px-4
//             py-3
//             text-xl
//             shadow-xl
//             hover:scale-110
//             active:scale-95
//             transition-all
//             duration-300
//           "
//         >
//           {playing ? "🎵" : "🔇"}
//         </button>
//       </div>
//     </>
//   );
// }




import { useEffect, useRef, useState } from "react";

const MUSIC_URL =
  "https://res.cloudinary.com/zcqrc1n8/video/upload/v1786215518/happy-birthday_zyldyu.mp3";

export default function Music() {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);

  const startMusic = async () => {
    if (!audioRef.current) return;

    try {
      await audioRef.current.play();
      setPlaying(true);
    } catch (error) {
      console.error("Music error:", error);
    }
  };

  useEffect(() => {
    const handleInteraction = () => {
      startMusic();

      window.removeEventListener("click", handleInteraction);
      window.removeEventListener("touchstart", handleInteraction);
    };

    window.addEventListener("click", handleInteraction);
    window.addEventListener("touchstart", handleInteraction);

    return () => {
      window.removeEventListener("click", handleInteraction);
      window.removeEventListener("touchstart", handleInteraction);
    };
  }, []);

  const toggleMusic = async () => {
    if (!audioRef.current) return;

    if (audioRef.current.paused) {
      await startMusic();
    } else {
      audioRef.current.pause();
      setPlaying(false);
    }
  };

  return (
    <>
      <audio
        ref={audioRef}
        src={MUSIC_URL}
        preload="auto"
        loop
      />

      <button
        onClick={toggleMusic}
        className="
          fixed
          right-5
          top-5
          z-[9999]
          flex
          h-12
          w-12
          items-center
          justify-center
          rounded-full
          bg-white/10
          text-xl
          backdrop-blur-xl
          shadow-xl
          transition
          hover:scale-110
        "
      >
        {playing ? "🔊" : "🎵"}
      </button>
    </>
  );
}