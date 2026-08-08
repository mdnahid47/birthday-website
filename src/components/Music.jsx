
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

export default function Music() {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) return;

    audio.volume = 0.5;

    const playMusic = async () => {
      try {
        await audio.play();
        setPlaying(true);
      } catch (error) {
        console.log("Autoplay blocked by browser:", error);
      }
    };

    playMusic();

    return () => {
      audio.pause();
    };
  }, []);

  const toggleMusic = async () => {
    const audio = audioRef.current;

    if (!audio) return;

    try {
      if (audio.paused) {
        await audio.play();
        setPlaying(true);
      } else {
        audio.pause();
        setPlaying(false);
      }
    } catch (error) {
      console.log("Music error:", error);
    }
  };

  return (
    <>
      {/* Background Music */}
      <audio
        ref={audioRef}
        src="../../../public/music/happy-birthday.mp3"
        loop
        preload="auto"
      />

      {/* Music Button */}
      <div className="fixed right-5 top-5 z-50">
        <button
          onClick={toggleMusic}
          aria-label={playing ? "Pause music" : "Play music"}
          className="
            glass
            rounded-full
            px-4
            py-3
            text-xl
            shadow-xl
            hover:scale-110
            active:scale-95
            transition-all
            duration-300
          "
        >
          {playing ? "🎵" : "🔇"}
        </button>
      </div>
    </>
  );
}